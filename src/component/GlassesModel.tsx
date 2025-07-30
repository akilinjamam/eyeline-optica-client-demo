"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GlassesModelProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

const GlassesModel: React.FC<GlassesModelProps> = ({ position, rotation, scale }) => {
  const { scene } = useGLTF('/3dImages/glass_eye.glb'); // adjust path if needed
  const modelRef = useRef<any>(scene);

  // Fix inverted normals when using negative scale
  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        child.material.side = THREE.DoubleSide;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...position);
      modelRef.current.rotation.set(...rotation);
      modelRef.current.scale.set(scale, scale, scale);
    }
  });

  console.log('modelPosition', position)
  console.log('modelScale', scale)
  console.log('modelRotation', rotation)

  return (
    <group scale={[1, -1, 1]}>
      <primitive object={scene} ref={modelRef} />
    </group>
  );
};

export default GlassesModel;
