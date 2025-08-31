// Laptop.jsx
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Laptop({ position = [0, 0, 0], size = 1, ...props }) {
  const ref = useRef();

  // Change path if your file is named differently (e.g. "/models/Computer.glb")
  const { scene } = useGLTF("/models/Laptop.glb");

  useFrame(({ clock }, dt) => {
    const t = clock.getElapsedTime();
    if (!ref.current) return;

    // gentle float + drift
    ref.current.rotation.y += 0.1 * dt;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.02;

    ref.current.position.set(
      position[0] + Math.sin(t * 0.6) * 0.05 * size,
      position[1] + Math.sin(t * 1.4) * 0.04 * size,
      position[2] + Math.cos(t * 0.3) * 0.03 * size
    );
  });

  return (
    <group ref={ref} scale={size} {...props}>
      <primitive object={scene} dispose={null} />
    </group>
  );
}

useGLTF.preload("/models/Laptop.glb");
