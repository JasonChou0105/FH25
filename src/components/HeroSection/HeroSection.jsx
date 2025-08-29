import { Canvas } from "@react-three/fiber";
import Planet from "../3d/Planet";
import { Suspense } from "react";
import Moon from "../3d/Moon";
import TitleMain from "./TitleMain";
import Sun from "../3d/Sun";
import Net from "../Background/Net";
import MouseLight from "../MouseLight/MouseLight";
import Astronaut from "../3d/Astronaut";

function HeroSection() {
  return (
    <>
      <Suspense fallback={null}>
        <Astronaut position={[0.5, -0.3, 3.9]} scale={0.0001} />
        <Planet position={[0, 0, -1]} scale={0.2} />
        <Moon
          position={[3, 1, 1]}
          lightOffset={[-0.8, 0.2, 0.2]}
          scale={0.07}
          intensity={0.2}
        />
        <Moon
          position={[-4.5, -3, -1]}
          lightOffset={[0.5, 1.4, 0.6]}
          scale={0.07}
          intensity={0.1}
        />
        <Sun
          position={[-2.1, 1, 3]}
          lightOffset={[0.5, -0.2, 0.1]}
          scale={0.2}
        />
      </Suspense>
    </>
  );
}

export default HeroSection;
