// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useRef } from 'react';
// import { useGLTF } from '@react-three/drei';
// import { useFrame } from '@react-three/fiber';

// interface GlassesModelProps {
//   position: [number, number, number];
//   rotation: [number, number, number];
//   scale: number;
// }

// const GlassesModelV2: React.FC<GlassesModelProps> = ({ position, rotation, scale }) => {
//   const { scene } = useGLTF('/3dImages/glasses.glb'); // adjust path if needed
//   const modelRef = useRef<any>(scene);

//   useFrame(() => {
//     if (modelRef.current) {
//       modelRef.current.position.set(...position);
//       modelRef.current.rotation.set(...rotation);
//       modelRef.current.scale.set(scale, scale, scale);
//     }
//   });

//   console.log('modelPosition', position)
//   console.log('modelScale', scale)
//   console.log('modelRotation', rotation)

//   return (
//     <primitive object={scene} ref={modelRef} />
//   );
// };

// export default GlassesModelV2;
