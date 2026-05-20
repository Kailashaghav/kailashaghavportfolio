"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShapes() {
  const g1 = useRef<THREE.Mesh>(null);
  const g2 = useRef<THREE.Mesh>(null);
  const g3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (g1.current) { g1.current.rotation.x = t * 0.3; g1.current.rotation.y = t * 0.2; }
    if (g2.current) { g2.current.rotation.x = -t * 0.2; g2.current.rotation.z = t * 0.15; }
    if (g3.current) { g3.current.rotation.y = t * 0.25; g3.current.rotation.z = -t * 0.1; }
  });

  return (
    <>
      <Float speed={2} floatIntensity={0.5}>
        <mesh ref={g1} position={[0, 0, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial color="#ff4d1c" distort={0.2} speed={3} metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.5} floatIntensity={0.8}>
        <mesh ref={g2} position={[2, 1, -1]}>
          <tetrahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#00ffd1" metalness={0.9} roughness={0.1} emissive="#00ffd1" emissiveIntensity={0.3} />
        </mesh>
      </Float>

      <Float speed={1.8} floatIntensity={0.6}>
        <mesh ref={g3} position={[-1.5, -1, 0.5]}>
          <dodecahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial color="#7c3aed" metalness={0.7} roughness={0.3} emissive="#7c3aed" emissiveIntensity={0.4} />
        </mesh>
      </Float>

      <pointLight position={[3, 3, 3]} color="#ff4d1c" intensity={2} />
      <pointLight position={[-3, -3, -3]} color="#00ffd1" intensity={1.5} />
      <ambientLight intensity={0.15} />
    </>
  );
}

export default function AboutCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
      <FloatingShapes />
    </Canvas>
  );
}
