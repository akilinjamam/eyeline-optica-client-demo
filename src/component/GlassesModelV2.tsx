import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';

interface GlassesModelProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

const GlassesModelV2: React.FC<GlassesModelProps> = ({ position, rotation, scale }) => {
  const { scene } = useGLTF('/3dImages/glasses.glb'); // <<< IMPORTANT: Verify this path!
  const modelRef = useRef<Group>(null);

  // --- Static Adjustments for your 3D Model ---
  // This useEffect runs once when the component mounts.
  // Use this to fix the initial orientation, position, or size of your GLTF model
  // relative to its own internal coordinate system, BEFORE dynamic tracking applies.
  // This is crucial if your model wasn't exported with a clean origin/orientation.
  useEffect(() => {
    if (modelRef.current) {
      // Example: If your model is too large by default, scale it down.
      // modelRef.current.scale.set(0.1, 0.1, 0.1);

      // Example: If your model is facing the wrong way (e.g., 180 degrees off)
      // modelRef.current.rotation.y = Math.PI; // Rotate 180 degrees around Y

      // Example: If the model's pivot point is not at the center of the glasses
      // modelRef.current.position.y = -0.05; // Shift down slightly

      // Traverse the scene to adjust properties of individual meshes if needed
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          // Adjust material properties for better rendering (optional)
          // For example, enable transparent rendering if parts of the model are clear.
          // if ((child as THREE.Mesh).material instanceof THREE.Material) {
          //   ((child as THREE.Mesh).material as THREE.Material).transparent = true;
          //   ((child as THREE.Mesh).material as THREE.Material).opacity = 0.8;
          // }
        }
      });
    }
  }, [scene]); // Re-run if scene object changes (unlikely for static GLTF)

  // @react-three/fiber automatically updates position, rotation, scale props
  // so a `useFrame` isn't strictly necessary here unless you have
  // other frame-by-frame logic specific to the model.

  return (
    <group
      ref={modelRef}
      position={position} // Dynamic position from face tracking
      rotation={rotation} // Dynamic rotation from face tracking
      scale={scale}       // Dynamic scale from face tracking
      dispose={null}      // Required by useGLTF to manage memory
    >
      <primitive object={scene} />
    </group>
  );
};

// Preload the GLTF model to avoid flickering on first render
useGLTF.preload('/3dImages/glasses.glb');

export default GlassesModelV2;