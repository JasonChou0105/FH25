import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib"; // safe clone for skinned/animated models

export default function Astronaut({
  position = [0, 0, 0],
  scale = 1,
  ...props
}) {
  const groupRef = useRef();
  const modelRef = useRef();

  // Load GLB + animations
  const { scene, animations } = useGLTF("/models/Astronaut.glb");
  
  // Clone first, then setup animations on the clone
  const cloned = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { mixer } = useAnimations(animations, cloned);

  useEffect(() => {
    if (animations.length > 0) {
      const original = animations[0];

      // Assume 30 fps unless you know otherwise
      const fps = 30;
      const startFrame = 30; // skip first 10 frames
      const endFrame = Math.floor(original.duration * fps) - 31;

      // Create a trimmed version of the clip
      const trimmed = THREE.AnimationUtils.subclip(
        original,
        "Trimmed",
        startFrame,
        endFrame,
        fps
      );

      // Play the trimmed clip on the cloned scene
      const action = mixer.clipAction(trimmed, cloned);
      action.reset().play();
    }
  }, [animations, mixer, cloned]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // Float the entire group (position)
    if (groupRef.current) {
      groupRef.current.position.set(
        position[0] + Math.sin(t * 0.6) * 0.05,
        position[1] + Math.sin(t * 2) * 0.02,
        position[2] + Math.cos(t * 0.4) * 0.01
      );
    }

    // Rotate only the model
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.15 * delta;
      modelRef.current.rotation.x += 0.1 * delta;
    }
  });

  return (
    <group ref={groupRef} scale={scale} {...props}>
      <group ref={modelRef}>
        <primitive object={cloned} dispose={null} />
      </group>
    </group>
  );
}
