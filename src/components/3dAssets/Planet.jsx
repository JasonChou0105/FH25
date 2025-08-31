import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
export default function Planet({ ...props }) {
  const ref = useRef();

  const { scene } = useGLTF("/models/Planet.glb");
  return (
    <group ref={ref}>
      <primitive object={scene} {...props} dispose={null} />
    </group>
  );
}
