/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import Image from 'next/image';
import glassesOverlay from '../../public/images/glass-3.png';

const GlassTryOn = () => {
  const webcamRef = useRef<Webcam>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [detector, setDetector] = useState<any>(null);

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

        if (faces.length > 0) {
          const face = faces[0];
          const keypoints = face.keypoints;

          const leftEye = keypoints.find((kp: any) => kp.name === 'leftEye');
          const rightEye = keypoints.find((kp: any) => kp.name === 'rightEye');
         

          if (leftEye && rightEye && overlayRef.current) {
            const eyeCenterX = (leftEye.x + rightEye.x) / 2;
            const eyeCenterY = (leftEye.y + rightEye.y) / 2;
            const eyeDistance = Math.abs(rightEye.x - leftEye.x);

            // Scale to webcam's rendered size
            const scaleX = webcamRef.current.video.offsetWidth / videoWidth;
            const scaleY = webcamRef.current.video.offsetHeight / videoHeight;

            overlayRef.current.style.transform = `translate(${eyeCenterX * scaleX - eyeDistance}px, ${
              eyeCenterY * scaleY - eyeDistance * 0.6
            }px)`;
            overlayRef.current.style.width = `${eyeDistance * 2 * scaleX}px`;
          }
        }
      }

      animationId = requestAnimationFrame(detectFace);
    };

    detectFace();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [detector]);

  

  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 150,
        // backgroundColor: 'rgba(255,0,0,0.3)',
          transition: '0.1s linear',
        }}
      >
        <Image src={glassesOverlay} alt="glasses" width={150} height={50} />
      </div>
    </div>
  );
};

export default GlassTryOn;
