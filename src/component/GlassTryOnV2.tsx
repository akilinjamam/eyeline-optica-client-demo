// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import React, { Suspense, useEffect, useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-backend-webgl';
// import { Canvas } from '@react-three/fiber';
// import GlassesModel from './GlassesModel';
// import { Leva, useControls } from 'leva';

// const GlassTryOn = () => {
//   const webcamRef = useRef<Webcam>(null);
//   const [detector, setDetector] = useState<any>(null);
//   const [modelPosition, setModelPosition] = useState<[number, number, number]>([0, 0, 0]);
//   const [modelRotation, setModelRotation] = useState<[number, number, number]>([0, 0, 0]);
//   const [modelScale, setModelScale] = useState<number>(1);
//     const [hasDetection, setHasDetection] = useState<string>('');

//   // Leva controls for fine-tuning
//   const { xOffset, yOffset, zOffset, rotationOffsetX, rotationOffsetY, rotationOffsetZ, scaleAdjust } = useControls({
//     xOffset: { value: 0.0, min: -0.5, max: 0.5, step: 0.01 }, // Horizontal fine-tune
//     yOffset: { value: 0.0, min: -0.5, max: 0.5, step: 0.01 }, // Vertical fine-tune
//     zOffset: { value: 0.0, min: -1.0, max: 1.0, step: 0.01 }, // Depth fine-tune. Can be negative/positive depending on GLB origin and estimatedZ.
//     rotationOffsetX: { value: 0, min: -Math.PI / 4, max: Math.PI / 4, step: 0.01 }, // Pitch fine-tune (-45 to +45 degrees)
//     rotationOffsetY: { value: 0, min: -Math.PI / 4, max: Math.PI / 4, step: 0.01 }, // Yaw fine-tune (-45 to +45 degrees)
//     rotationOffsetZ: { value: 0, min: -Math.PI / 6, max: Math.PI / 6, step: 0.01 }, // Roll fine-tune (-30 to +30 degrees). Keep `value: 0` initially.
//    scaleAdjust: { value: 1.5, min: 0.5, max: 2.0, step: 0.01 }, // Global scale adjustment (e.g., half to double the calculated size)
//   });

//   useEffect(() => {
//     const loadModel = async () => {
//       console.log('Loading TensorFlow.js and Face Landmarks Detection model...');
//       const faceLandmarksDetection = await import('@tensorflow-models/face-landmarks-detection');
//       const model = await faceLandmarksDetection.createDetector(
//         faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
//         {
//           maxFaces: 1,
//           runtime: 'tfjs',
//           refineLandmarks: true,
//         }
//       );
//       setDetector(model);
//       console.log('Model loaded successfully!');
//     };

//     tf.ready().then(loadModel);
//   }, []);

//   useEffect(() => {
//     let animationId: number;
//     let lastDetectionTime = 0;

//     const detectFace = async () => {
//       // console.log('detectFace loop running...');

//       const now = performance.now();
//       const interval = 100;

//        if (now - lastDetectionTime < interval) {
//       animationId = requestAnimationFrame(detectFace);
//       return;
//     }

//       if (
//         detector &&
//         webcamRef.current &&
//         webcamRef.current.video &&
//         webcamRef.current.video.readyState === 4
//       ) {
//         const video = webcamRef.current.video as HTMLVideoElement;
//         const videoWidth = video.videoWidth;
//         const videoHeight = video.videoHeight;

//         video.width = videoWidth;
//         video.height = videoHeight;
        

//         const faces = await detector.estimateFaces(video);
//         // console.log('Faces detected:', faces.length);

//         if (faces.length > 0) {
//           setHasDetection('')
//           const face = faces[0];
//           const keypoints = face.keypoints;

//           console.log(keypoints)

//           // const leftEye = keypoints.find((kp: any) => kp.name === 'leftEye');
//           // const rightEye = keypoints.find((kp: any) => kp.name === 'rightEye');
//           const leftEye = keypoints[468]
//           const rightEye = keypoints[473]
//           // const leftEye = keypoints[234];
//           // const rightEye = keypoints[454];

//           if (leftEye && rightEye) {
//             setHasDetection('')
//             // console.log('Left and Right eyes found.');
//             // console.log('leftEye:', leftEye);
//             // console.log('rightEye:', rightEye);

//             // 1. Calculate Position (X, Y)
//             const centerX = (leftEye.x + rightEye.x) / 2;
//             const centerY = (leftEye.y + rightEye.y) / 2;

//             // Normalize coordinates to a -1 to 1 range (or similar, depending on your Three.js scene scale)
//             // Three.js typically has Y-axis up, X-axis right, Z-axis out of screen (towards viewer)
//             // Webcam coordinates: origin top-left, Y-down. Need to invert Y and center.
//             const normX = -((centerX - videoWidth / 2) / (videoWidth / 2)); // -1 (left) to 1 (right)
//            const normY = -((centerY - videoHeight / 2) / (videoHeight / 2)); // -1 (bottom) to 1 (top)

//             // Adjust position for the Three.js scene's scale.
//             // A multiplier like 2 or 3 often works well for a camera at Z=5 and FOV=75.
//             const sceneScaleMultiplier = 5; // Tune this value!
//             const newX = normX * sceneScaleMultiplier;
//             const newY = normY * sceneScaleMultiplier;

//             // 2. Estimate Z-Position (Depth)
//             // This is the trickiest part with only 2 points.
//             // MediaPipe provides a 'z' coordinate for each keypoint, which is relative depth.
//             // A smaller 'z' value generally means closer to the camera (within the face mesh's own coordinate system).
//             // Average the Z from both eyes.
//             let estimatedZ = 0;
//             if (leftEye.z !== undefined && rightEye.z !== undefined) {
//               const avgEyeZ = (leftEye.z + rightEye.z) / 2;
//               // Map MediaPipe's relative Z to your Three.js scene's Z-depth.
//               // This multiplier is very sensitive and depends on your GLB model's scale
//               // and your Three.js camera setup. Negative values might be needed if MP Z decreases as you get closer.
//               // Try positive and negative values.
//               estimatedZ = avgEyeZ * 0.005; // Tune this multiplier carefully!
//             }


//             // 3. Calculate Rotation (Z-axis / Roll)
//             const dx = rightEye.x - leftEye.x;
//             const dy = rightEye.y - leftEye.y;
//             const angleZ = Math.atan2(dy, dx); // Angle in radians

//             // 4. Approximate Rotation (X-axis / Pitch and Y-axis / Yaw)
//             // This is very difficult with just two eye points.
//             // You can try very rough approximations based on Z-differences,
//             // but these will be less accurate than with more landmarks (e.g., nose tip, chin).
//             const angleX = 0; // Pitch (looking up/down)
//             let angleY = 0; // Yaw (looking left/right)

//             if (leftEye.z !== undefined && rightEye.z !== undefined) {
//                 // Very rough Yaw: If one eye's Z is significantly different, head is turned.
//                 // Adjust multiplier for sensitivity.
//                 angleY = -(rightEye.z - leftEye.z) * 0.02; // Tune this.
//             }
//             // Pitch is even harder. You might just have to rely on `rotationOffsetX` from Leva for this.


//             // 5. Calculate Scale
//             const eyeDistance = Math.hypot(dx, dy); // Euclidean distance between eyes
//             // Scale the glasses based on eye distance.
//             // `100` is an arbitrary baseline eye distance in pixels. Adjust it.
//             // `1.5` is an initial scale factor for the glasses themselves. Adjust it.
//             const baseScale = (eyeDistance / 100) * 1.5;


//             // Apply offsets from Leva controls
//             setModelPosition([
//               newX + xOffset,
//               newY + yOffset,
//               estimatedZ + zOffset
//             ]);

//             setModelRotation([
//               angleX + rotationOffsetX,
//               angleY + rotationOffsetY,
//               angleZ + rotationOffsetZ // Negate angleZ to correctly match webcam's mirrored view
//             ]);

//             setModelScale(baseScale * scaleAdjust); // Apply global scale adjustment from Leva

//           } else {
//             // console.log('Eyes not found. Waiting for detection...');
//             setHasDetection('Eyes not found. Waiting for detection...')
//           }
//         } else {
//           // console.log('No face detected.');
//            setHasDetection('face detecting. please wait...')
//         }
//       } else {
//         // console.log('Webcam or detector not ready.');
//          setHasDetection('Webcam and detector is initializing...')
//       }

//        lastDetectionTime = now;

//       animationId = requestAnimationFrame(detectFace);
//     };

//     detectFace();

//     return () => {
//       cancelAnimationFrame(animationId);
//     };
//   }, [detector, xOffset, yOffset, zOffset, rotationOffsetX, rotationOffsetY, rotationOffsetZ, scaleAdjust]); // Added new dependencies

//   return (
//     <>
//       <Leva hidden /> {/* ← Add this line to hide the panel */}
//       <div className="relative w-full max-w-[800px] mx-auto aspect-video border border-gray-300 rounded-lg overflow-hidden">
//         <Webcam
//           ref={webcamRef}
//           audio={false}
//           mirrored
//           screenshotFormat="image/jpeg"
//           className="absolute inset-0 w-full h-full object-cover" // Ensure it covers the container
//         />

//          {hasDetection && (
//           <div className="absolute inset-0 z-20 flex items-start justify-center  bg-opacity-60 text-white text-lg font-medium">
//             {hasDetection}
//           </div>
//         )}

//         {/* Overlay for the 3D model */}
//         <div className="absolute top-0 left-0 w-full h-full z-10">
//           <Canvas camera={{ position: [0, 0, 5], fov: 75 }} style={{ pointerEvents: 'none'}}>
//             {/* pointerEvents: 'none' is important if you don't want the canvas to block clicks */}
//             <ambientLight intensity={1} />
//             <directionalLight position={[10, 10, 10]} intensity={2} />
//             <directionalLight position={[-10, -10, -10]} intensity={1} />
//             {/* Optional: Add a light from the opposite side for better shading */}

//             <Suspense fallback={null}>
//               {!hasDetection && (
//                 <GlassesModel
//                   position={modelPosition}
//                   rotation={modelRotation}
//                   scale={modelScale}
//                 />
//               )}
//             </Suspense>
//             {/* <OrbitControls /> // Temporarily uncomment for debugging 3D scene manually */}
//           </Canvas>
//         </div>
//       </div>
//     </>
//   );
// };

// export default GlassTryOn;