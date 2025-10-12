// Satellite2.jsx
import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib"; // safe clone for skinned/animated models

export default function Asteroid({
  position = [0, 0, 0],
  scale = 1,
  lightOffset = [0, 0, 0],
  intensity,
}) {
  const groupRef = useRef();
  const modelRef = useRef();
  const { scene } = useGLTF("/models/background/Asteroid.glb");

  // Clone so multiple instances don't share the same scene reference
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Animation frame for floating and rotating
  useFrame(({ clock }, dt) => {
    const t = clock.getElapsedTime();
    
    // Float the entire group (position) - different frequencies than Satellite1
    if (groupRef.current) {
      groupRef.current.position.set(
        position[0] + Math.sin(t * 0.025) * 0.07,
        position[1] + Math.cos(t * 0.035) * 0.08,
        position[2] + Math.sin(t * 0.028) * 0.06
      );
    }

    // Rotate only the model - different speeds than Satellite1
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.015 * dt;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      <group ref={modelRef}>
        <primitive object={cloned} scale={scale} dispose={null} />
      </group>
      <pointLight
        color="#ffffff"
        intensity={intensity}
        decay={2}
        position={lightOffset}
      />
    </group>
  );
}

// Optional: preload the asset
useGLTF.preload("/models/background/Asteroid.glb");
