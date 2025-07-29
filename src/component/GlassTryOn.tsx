/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import GlassesModel from './GlassesModel';
import {useControls} from 'leva'

const GlassTryOn = () => {
  const webcamRef = useRef<Webcam>(null);
  const [detector, setDetector] = useState<any>(null);
  const [modelPosition, setModelPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [modelRotation, setModelRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [modelScale, setModelScale] = useState<number>(1);

  const { xOffset, yOffset, zOffset, rotationOffsetZ } = useControls({
  xOffset: { value: 0.3, min: -2, max: 2, step: 0.01 },
  yOffset: { value: 0.2, min: -2, max: 2, step: 0.01 },
  zOffset: { value: 0, min: -2, max: 2, step: 0.01 },
  rotationOffsetZ: { value: 0, min: -Math.PI / 2, max: Math.PI / 2, step: 0.01 },
});

  useEffect(() => {
    const loadModel = async () => {
      const faceLandmarksDetection = await import('@tensorflow-models/face-landmarks-detection');
      const model = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: 'tfjs',
          refineLandmarks: true,
        }
      );
      setDetector(model);
    };

    tf.ready().then(loadModel);
  }, []);

  useEffect(() => {
    let animationId: number;

    const detectFace = async () => {
      if (
        detector &&
        webcamRef.current &&
        webcamRef.current.video &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video as HTMLVideoElement;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

          video.width = videoWidth;
          video.height = videoHeight;

        const faces = await detector.estimateFaces(video);
        console.log()

        if (faces.length > 0) {
          const face = faces[0];
          const keypoints = face.keypoints;

          const leftEye = keypoints.find((kp: any) => kp.name === 'leftEye');
          const rightEye = keypoints.find((kp: any) => kp.name === 'rightEye');

          if (leftEye && rightEye) {
          const centerX = (leftEye.x + rightEye.x) / 2;
          const centerY = (leftEye.y + rightEye.y) / 2;
          const eyeDistance = Math.abs(rightEye.x - leftEye.x);

          // Convert to Three.js coordinate space
          const normX = (centerX - videoWidth / 2) / videoWidth;
          const normY = -(centerY - videoHeight / 2) / videoHeight;

          // Rotation Z axis (head tilt)
          const dx = rightEye.x - leftEye.x;
          const dy = rightEye.y - leftEye.y;
          const angleZ = Math.atan2(dy, dx); // radians

          const scaleMultiplier = 5;

          
          // setModelPosition([normX * scaleMultiplier, normY * scaleMultiplier, 0]);
          // setModelPosition([
          //   normX * scaleMultiplier + 0.3, // horizontal offset
          //   normY * scaleMultiplier + 0.2, // vertical offset
          //   0
          // ]);

          setModelPosition([
              normX * scaleMultiplier + xOffset,
              normY * scaleMultiplier + yOffset,
            zOffset
          ]);

         
          setModelScale((eyeDistance / 100) * 1.5)
          setModelRotation([0, 0, -angleZ + rotationOffsetZ]); // negate to match webcam orientation

}
        }
      }

      animationId = requestAnimationFrame(detectFace);
    };

    detectFace();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [detector, xOffset, yOffset, zOffset, rotationOffsetZ ]);

  return (
    <div className="relative w-full max-w-[600px] mx-auto aspect-video">
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored
        screenshotFormat="image/jpeg"
        // style={{
        //   width: '100%',
        //   height: '100%',
        //   position: 'absolute',
        //   zIndex: 1,
        // }}
      />

      <div className="absolute top-0 left-0 w-full h-full z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ pointerEvents: 'none' }}>
  <ambientLight intensity={1} />
  <directionalLight position={[10, 10, 10]} />
  <GlassesModel
    position={modelPosition} // from face tracking
    rotation={modelRotation} // optional, for angle
    scale={modelScale}       // adjust for size
  />
</Canvas>
      </div>
    </div>
  );
};

export default GlassTryOn;
