import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Astronaut({
  position = [0, 0, 0],
  scale = 1,
  ...props
}) {
  const ref = useRef();

  // Load GLB + animations
  const { scene, animations } = useGLTF("/models/Astronaut.glb");
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    const clip = actions["Idle"] || Object.values(actions)[0];
    clip?.reset().play();
  }, [actions]);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (ref.current) {
      // Rotation
      ref.current.rotation.y += 0.15 * delta;
      ref.current.rotation.x += 0.1 * delta;

      // Floating offsets (applied *relative* to base position)
      ref.current.position.set(
        position[0] + Math.sin(t * 0.6) * 0.05, // drift X
        position[1] + Math.sin(t * 2) * 0.02, // float Y
        position[2] + Math.cos(t * 0.4) * 0.01 // drift Z
      );
    }
  });

  return (
    <group ref={ref} scale={scale} {...props}>
      <primitive object={scene} dispose={null} />
    </group>
  );
}
