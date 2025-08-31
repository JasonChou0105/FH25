import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Astronaut({
  position = [0, 0, 0],
  scale = 1,
  ...props
}) {
  const ref = useRef();

  // Load GLB + animations
  const { scene, animations } = useGLTF("/models/Astronaut.glb");
  const { mixer } = useAnimations(animations, scene);

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

      // Play the trimmed clip
      const action = mixer.clipAction(trimmed, scene);
      action.reset().play();
    }
  }, [animations, mixer, scene]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (ref.current) {
      // Example: no rotation / floating since you zeroed it out
      ref.current.rotation.y += 0.15 * delta;
      ref.current.rotation.x += 0.1 * delta;

      // Floating offsets
      ref.current.position.set(
        position[0] + Math.sin(t * 0.6) * 0.05,
        position[1] + Math.sin(t * 2) * 0.02,
        position[2] + Math.cos(t * 0.4) * 0.01
      );
    }
  });

  return (
    <group ref={ref} scale={scale} {...props}>
      <primitive object={scene} dispose={null} />
    </group>
  );
}
