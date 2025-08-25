import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
export default function Moon({ position, scale, lightOffset = [0, 0, 0] }) {
  const ref = useRef();

  const { scene } = useGLTF("/models/Moon.glb");
  return (
    <group position={position} ref={ref}>
      <primitive object={scene} scale={scale} dispose={null} />
      <pointLight
        color={"#ffffff"}
        intensity={0.3} // raise this if it feels dim
        distance={4} // how far the light reaches
        decay={2} // physical falloff
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        position={lightOffset}
      />
    </group>
  );
}
