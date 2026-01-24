import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Premium Particle Field – 2025
 * Neon Glow • Organic Motion • Instanced Performance
 */

export default function Particles({
  count = 1200,
  color = '#0066FF',
  size = 0.035,
}) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate particle attributes
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      t: Math.random() * 100,
      speed: 0.005 + Math.random() * 0.01,
      radius: 5 + Math.random() * 20,
      offset: new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(60),
        THREE.MathUtils.randFloatSpread(60),
        THREE.MathUtils.randFloatSpread(60)
      ),
    }));
  }, [count]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      p.t += p.speed;

      // Smooth orbital + floating motion
      const x = Math.cos(p.t + time * 0.3) * p.radius + p.offset.x;
      const y = Math.sin(p.t * 1.2) * (p.radius * 0.6) + p.offset.y;
      const z = Math.sin(p.t + time * 0.5) * p.radius + p.offset.z;

      dummy.position.set(x, y, z);

      // Subtle breathing scale
      const scale = 0.6 + Math.sin(p.t * 2) * 0.4;
      dummy.scale.setScalar(scale);

      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[size, 10, 10]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
        emissive={color}
        emissiveIntensity={1.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
