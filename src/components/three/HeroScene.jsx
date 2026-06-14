import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import { useRef, Suspense } from 'react';

// Subtle floating 'scales of justice'-inspired abstract form behind the hero.
function Pillar({ position, scale = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.18;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusKnotGeometry args={[0.9, 0.28, 160, 24]} />
        <meshStandardMaterial color="#c8a96a" metalness={0.85} roughness={0.25} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0 opacity-80" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.8]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.1} />
          <Pillar position={[2.4, 0.4, 0]} scale={1.1} />
          <Pillar position={[-2.6, -0.6, -1]} scale={0.7} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}
