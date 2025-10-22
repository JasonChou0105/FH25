// Earth.jsx
import { useGLTF } from "@react-three/drei";
import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib"; // safe clone for skinned/animated models
import * as THREE from "three";

export default function Earth({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef();
  const modelRef = useRef();
  const { scene } = useGLTF("/models/Earth.glb");

  // Clone so multiple instances don't share the same scene reference
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Brighten the planet's material
  useEffect(() => {
    cloned.traverse((child) => {
      if (child.isMesh) {
        // Make the material emissive (self-illuminating) and brighter
        if (child.material) {
          child.material.emissive = new THREE.Color(0.3, 0.3, 0.3); // Blue glow
          child.material.emissiveIntensity = 0.02;
          // Increase the base color brightness
          if (child.material.color) {
            child.material.color.multiplyScalar(1.5);
          }
          child.material.needsUpdate = true;
        }
      }
    });
  }, [cloned]);

  // Rotate Earth with a slight bias (tilted axis)
  useFrame(({ clock }, dt) => {
    // Only rotate the inner model group, not the position group
    if (groupRef.current) {
      // Use sin to create smooth oscillating rotation (prevents accumulation)
      groupRef.current.rotation.x += dt * 0.05;
      groupRef.current.rotation.y -= dt * 0.2;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      <group ref={modelRef} position={[0, -3, 0]}>
        <primitive object={cloned} scale={scale} dispose={null} />
      </group>
    </group>
  );
}

// Optional: preload the asset
useGLTF.preload("/models/Earth.glb");
