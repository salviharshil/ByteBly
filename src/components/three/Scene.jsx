import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import {
  Preload,
  AdaptiveEvents,
  AdaptiveDpr,
} from '@react-three/drei';

import Shapes from './Shapes';
import Particles from './Particles';

/**
 * Premium 3D Scene – 2025
 * Optimized Canvas • Cinematic Lighting • Scalable Architecture
 */

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-screen bg-[#0A0A0F] overflow-hidden">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 40, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        frameloop="always"
      >
        {/* === Lighting Setup === */}
        <ambientLight intensity={0.35} />

        <pointLight
          position={[8, 8, 8]}
          intensity={1.2}
          color="#0066FF"
        />

        <spotLight
          position={[-8, 10, 6]}
          angle={0.25}
          penumbra={1}
          intensity={1.1}
          color="#8B5CF6"
          castShadow
        />

        {/* === Scene Content === */}
        <Suspense fallback={null}>
          <group>
            <Shapes />
            <Particles />
          </group>

          {/* Preload everything for smooth first interaction */}
          <Preload all />
        </Suspense>

        {/* === Performance Helpers === */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
