import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
export default function Sun({ position, scale, lightOffset = [0, 0, 0] }) {
  const ref = useRef();

  const { scene } = useGLTF("/models/Sun.glb");
  return (
    <group position={position} ref={ref}>
      <primitive object={scene} scale={scale} dispose={null} />
      <pointLight
        color={"#fffdc7"}
        intensity={3} // raise this if it feels dim
        decay={2} // physical falloff
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        position={lightOffset}
      />
      <pointLight
        color={"#fffdc7"}
        intensity={4} // raise this if it feels dim
        decay={2} // physical falloff
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        position={[-lightOffset[0], -lightOffset[1] + 0.2, 2]}
      />
      <pointLight
        color={"#fffdc7"}
        intensity={20} // raise this if it feels dim
        distance={5} // how far the light reaches
        decay={2} // physical falloff
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        position={[-lightOffset[0], -lightOffset[1] + 0.2, 0]}
      />
    </group>
  );
}
