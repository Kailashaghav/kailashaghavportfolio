"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

function IcosahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.12;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef as any} castShadow>
        <icosahedronGeometry args={[1.8, 4]} />
        <MeshDistortMaterial
          color="#ff4d1c"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function WireFrame() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = -state.clock.elapsedTime * 0.08;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
  });
  return (
    <mesh ref={meshRef as any}>
      <icosahedronGeometry args={[2.4, 1]} />
      <meshBasicMaterial color="#ff4d1c" wireframe opacity={0.07} transparent />
    </mesh>
  );
}

function ParticleField() {
  const count = 500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 22;
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      if (t < 0.35) { arr[i*3]=1; arr[i*3+1]=0.3; arr[i*3+2]=0.11; }      // ember
      else if (t < 0.55) { arr[i*3]=0; arr[i*3+1]=1; arr[i*3+2]=0.82; }   // aurora
      else { arr[i*3]=0.9; arr[i*3+1]=0.9; arr[i*3+2]=0.94; }             // ghost
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef as any}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function RingOrbit({
  radius,
  speed,
  tilt,
  color = "#00ffd1",
}: {
  radius: number;
  speed: number;
  tilt: number;
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * speed;
    groupRef.current.rotation.x = tilt;
  });
  return (
    <group ref={groupRef as any}>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.004, 8, 120]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

function Scene() {
  const { mouse } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-mouse.y * 0.15 - groupRef.current.rotation.x) * 0.05;
  });
  return (
    <group ref={groupRef as any}>
      <IcosahedronMesh />
      <WireFrame />
      <RingOrbit radius={3.2} speed={0.4}  tilt={0.3}  color="#00ffd1" />
      <RingOrbit radius={4.2} speed={-0.25} tilt={1.1} color="#ff4d1c" />
      <RingOrbit radius={2.8} speed={0.6}  tilt={0.8}  color="#7c3aed" />
      <ParticleField />
      <pointLight position={[10, 10, 5]}   color="#ff4d1c" intensity={3} />
      <pointLight position={[-10, -5, -5]} color="#00ffd1" intensity={2} />
      <ambientLight intensity={0.12} />
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      className="canvas-container"
      camera={{ position: [0, 0, 7], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <Stars radius={90} depth={50} count={2200} factor={3} saturation={0} fade speed={0.5} />
        <Scene />
      </Suspense>
    </Canvas>
  );
}
