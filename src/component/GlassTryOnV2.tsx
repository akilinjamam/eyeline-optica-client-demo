/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';
import GlassesModel from './GlassesModel';

// Define a type for your landmark points for clarity
type LandmarkPoint = [number, number, number];

const GlassTryOn = () => {
  const webcamRef = useRef<Webcam>(null);
  const [detector, setDetector] = useState<any>(null);
  const [modelPosition, setModelPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [modelRotation, setModelRotation] = useState<[number, number, number]>([0, 0, 0]);
  const [modelScale, setModelScale] = useState<number>(0); // Start with 0 scale to hide initially

  // State for user feedback messages
  const [feedbackMessage, setFeedbackMessage] = useState<string>('Loading AI model and webcam...');

  // Leva controls for fine-tuning
  const { xOffset, yOffset, zOffset, rotationOffsetX, rotationOffsetY, rotationOffsetZ, BASE_GLASSES_SCALE, REFERENCE_EYE_DISTANCE_PX } = useControls({
    // Position Offsets
    xOffset: { value: 0.0, min: -1.0, max: 1.0, step: 0.001 },
    yOffset: { value: 0.0, min: -1.0, max: 1.0, step: 0.001 },
    zOffset: { value: 0.0, min: -1.0, max: 1.0, step: 0.001 },
    // Rotation Offsets (in radians)
    rotationOffsetX: { value: 0.0, min: -Math.PI, max: Math.PI, step: 0.001 }, // Pitch
    rotationOffsetY: { value: 0.0, min: -Math.PI, max: Math.PI, step: 0.001 }, // Yaw
    rotationOffsetZ: { value: 0.0, min: -Math.PI, max: Math.PI, step: 0.001 }, // Roll
    // Scale Calibration
    BASE_GLASSES_SCALE: { value: 0.08, min: 0.01, max: 0.5, step: 0.001 }, // Adjust based on your model's native size
    REFERENCE_EYE_DISTANCE_PX: { value: 150, min: 50, max: 300, step: 1 }, // Find this by logging actual eyeDistance
  });

  // 1. Load TensorFlow.js Face Mesh model
  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready(); // Ensure TensorFlow.js backend is ready
        const faceLandmarksDetection = await import('@tensorflow-models/face-landmarks-detection');
        const model = await faceLandmarksDetection.createDetector(
          faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
          {
            runtime: 'tfjs',
            refineLandmarks: true,
          }
        );
        setDetector(model);
        setFeedbackMessage('Webcam initializing...');
      } catch (error) {
        console.error("Failed to load TensorFlow.js model:", error);
        setFeedbackMessage('Error loading AI model. Please try again.');
      }
    };
    loadModel();
  }, []);

  // Use a ref for the animation frame ID
  const animationFrameId = useRef<number | null>(null);

  // 2. Face Detection and Model Positioning Loop
  const detectFace = useCallback(async () => {
    // Basic checks for readiness
    if (
      !detector ||
      !webcamRef.current ||
      !webcamRef.current.video ||
      webcamRef.current.video.readyState !== 4
    ) {
      animationFrameId.current = requestAnimationFrame(detectFace);
      return;
    }

    const video = webcamRef.current.video as HTMLVideoElement;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Set video dimensions if they aren't already set (important for calculations)
    if (video.width !== videoWidth) video.width = videoWidth;
    if (video.height !== videoHeight) video.height = videoHeight;

    try {
      const faces = await detector.estimateFaces(video);

      if (faces.length > 0) {
        const face = faces[0];
        // Ensure scaledMesh is an array, default to empty
        const landmarks: LandmarkPoint[] = (face.scaledMesh || []) as LandmarkPoint[];

        // --- IMPROVED LANDMARK VALIDATION ---
        // Check if essential landmarks are present and valid
        const requiredLandmarkIndices = [1, 10, 133, 152, 168, 362]; // NoseTip, Forehead, LeftEyeInner, Chin, NoseBridge, RightEyeInner
        const areAllEssentialLandmarksPresent = requiredLandmarkIndices.every(idx =>
            landmarks[idx] &&
            typeof landmarks[idx][0] === 'number' &&
            typeof landmarks[idx][1] === 'number' &&
            typeof landmarks[idx][2] === 'number'
        );

        if (!areAllEssentialLandmarksPresent) {
          console.warn('Essential landmarks not fully detected. Skipping frame for pose estimation.');
          setFeedbackMessage('Poor face detection. Please adjust lighting or position.');
          setModelScale(0); // Hide glasses if landmarks are bad
          animationFrameId.current = requestAnimationFrame(detectFace);
          return;
        }

        // Access validated landmarks
        const leftEyeInner = landmarks[133];
        const rightEyeInner = landmarks[362];
        const noseBridge = landmarks[168];
        const noseTip = landmarks[1];
        const chin = landmarks[152];
        const forehead = landmarks[10];

        // --- POSITION CALCULATION ---
        const centerX_px = (leftEyeInner[0] + rightEyeInner[0] + noseBridge[0]) / 3;
        const centerY_px = (leftEyeInner[1] + rightEyeInner[1] + noseBridge[1]) / 3;
        const centerZ_px = (leftEyeInner[2] + rightEyeInner[2] + noseBridge[2]) / 3;

        const cameraFOVRad = 75 * Math.PI / 180;
        const aspect = videoWidth / videoHeight;
        const halfFovY = cameraFOVRad / 2;
        const distanceToPlane = 5;

        const worldHeightAtPlane = 2 * distanceToPlane * Math.tan(halfFovY);
        const worldWidthAtPlane = worldHeightAtPlane * aspect;

        const mappedX = (centerX_px - videoWidth / 2) / videoWidth * worldWidthAtPlane;
        const mappedY = -(centerY_px - videoHeight / 2) / videoHeight * worldHeightAtPlane;

        const Z_PIXEL_SCALE = 0.002;
        const BASE_WORLD_Z = 0; // Relative to camera Z

        const mappedZ = BASE_WORLD_Z + (centerZ_px * Z_PIXEL_SCALE);

        setModelPosition([
          mappedX + xOffset,
          mappedY + yOffset,
          mappedZ + zOffset
        ]);

        // --- SCALE CALCULATION ---
        const eyeDistancePx = Math.abs(rightEyeInner[0] - leftEyeInner[0]);
        const newScale = (eyeDistancePx / REFERENCE_EYE_DISTANCE_PX) * BASE_GLASSES_SCALE;
        setModelScale(newScale);

        // --- ROTATION CALCULATION (Pitch, Yaw, Roll) ---
        const pNoseTip = new THREE.Vector3(noseTip[0], noseTip[1], noseTip[2]);
        const pChin = new THREE.Vector3(chin[0], chin[1], chin[2]);
        const pLeftEye = new THREE.Vector3(leftEyeInner[0], leftEyeInner[1], leftEyeInner[2]);
        const pRightEye = new THREE.Vector3(rightEyeInner[0], rightEyeInner[1], rightEyeInner[2]);
        const pForehead = new THREE.Vector3(forehead[0], forehead[1], forehead[2]);

        const xAxis = new THREE.Vector3().subVectors(pLeftEye, pRightEye).normalize();
        const yAxis = new THREE.Vector3().subVectors(pForehead, pChin).normalize();
        const zAxis = new THREE.Vector3().crossVectors(xAxis, yAxis).normalize();

        const correctedYAxis = new THREE.Vector3().crossVectors(zAxis, xAxis).normalize();
        const correctedXAxis = new THREE.Vector3().crossVectors(correctedYAxis, zAxis).normalize();

        const rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeBasis(correctedXAxis, correctedYAxis, zAxis);

        const quaternion = new THREE.Quaternion().setFromRotationMatrix(rotationMatrix);
        const euler = new THREE.Euler().setFromQuaternion(quaternion, 'YXZ'); // 'YXZ' for Yaw, Pitch, Roll

        setModelRotation([
          euler.x + rotationOffsetX,
          euler.y + rotationOffsetY,
          euler.z + rotationOffsetZ
        ]);

        setFeedbackMessage('Tracking face...'); // Successful tracking
      } else {
        // No faces detected in this frame
        setFeedbackMessage('No face detected. Please face the camera.');
        setModelScale(0); // Hide glasses
      }
    } catch (error) {
      console.error("Error during face detection:", error);
      setFeedbackMessage('Error processing video. Please ensure webcam is active.');
      setModelScale(0); // Hide glasses on error
    }

    animationFrameId.current = requestAnimationFrame(detectFace); // Loop for next frame
  }, [
    detector,
    xOffset, yOffset, zOffset,
    rotationOffsetX, rotationOffsetY, rotationOffsetZ,
    BASE_GLASSES_SCALE, REFERENCE_EYE_DISTANCE_PX
  ]); // Re-create detectFace if these dependencies change

  // Effect to manage the animation frame loop
  useEffect(() => {
    if (detector) {
      const video = webcamRef.current?.video;
      const startDetection = () => {
        setFeedbackMessage('Detecting face...');
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        animationFrameId.current = requestAnimationFrame(detectFace);
      };

      if (video) {
        if (video.readyState === 4) {
          startDetection();
        } else {
          video.onloadeddata = startDetection;
        }
      }
    }

    // Cleanup function: cancel the animation frame when component unmounts
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [detector, detectFace]); // Dependencies for this effect

  return (
    <div style={{ position: 'relative', width: '80vw', height: '70vh', overflow: 'hidden' }}>
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored
        screenshotFormat="image/jpeg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        //   objectFit: 'cover',
          zIndex: 1,
        }}
      />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none', // Allow clicks/interactions to pass through to elements below if needed
      }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ background: 'transparent' }}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-10, -10, -10]} intensity={0.5} />

          <GlassesModel
            position={modelPosition}
            rotation={modelRotation}
            scale={modelScale}
          />
        </Canvas>
      </div>

      {/* User Feedback Overlay */}
      {feedbackMessage && modelScale === 0 && ( // Only show feedback if model is hidden
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0,0,0,0.6)',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '8px',
          fontSize: '1.2em',
          zIndex: 100,
          textAlign: 'center',
          pointerEvents: 'none', // Do not block interaction
        }}>
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

export default GlassTryOn;