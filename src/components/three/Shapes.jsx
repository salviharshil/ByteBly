import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  Sphere,
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

/**
 * Shapes – Premium 3D Hero Elements
 * Floating • Mouse-Reactive • Cinematic Lighting Ready
 */

export default function Shapes() {
  const mainRef = useRef();

  useFrame(({ mouse }) => {
    if (!mainRef.current) return;

    // Smooth mouse-driven parallax rotation
    mainRef.current.rotation.x = THREE.MathUtils.lerp(
      mainRef.current.rotation.x,
      mouse.y * 0.35,
      0.06
    );

    mainRef.current.rotation.y = THREE.MathUtils.lerp(
      mainRef.current.rotation.y,
      mouse.x * 0.35,
      0.06
    );
  });

  return (
    <group>
      {/* === Primary Hero Sphere === */}
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.8}>
        <Sphere ref={mainRef} args={[1, 128, 256]} scale={1.9}>
          <MeshDistortMaterial
            color="#0066FF"
            distort={0.35}
            speed={1.8}
            roughness={0.15}
            metalness={0.85}
            emissive="#8B5CF6"
            emissiveIntensity={0.25}
          />
        </Sphere>
      </Float>

      {/* === Accent Shape (Top Right) === */}
      <Float speed={2} rotationIntensity={2.5} floatIntensity={4}>
        <mesh position={[3.5, 2.5, -2]} scale={0.45}>
          <octahedronGeometry args={[1, 0]} />
          <MeshWobbleMaterial
            color="#00D9FF"
            speed={1.2}
            factor={0.6}
            roughness={0.3}
          />
        </mesh>
      </Float>

      {/* === Accent Shape (Bottom Left) === */}
      <Float speed={1.6} rotationIntensity={2} floatIntensity={3}>
        <mesh position={[-4.2, -2.5, -1.5]} scale={0.5}>
          <torusKnotGeometry args={[1, 0.35, 128, 32]} />
          <MeshDistortMaterial
            color="#8B5CF6"
            distort={0.45}
            speed={2.5}
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
      </Float>
    </group>
  );
}
