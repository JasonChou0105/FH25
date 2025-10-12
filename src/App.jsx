// App.jsx
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Stars } from "@react-three/drei";
import "./App.css";

import HeroSection from "./components/HeroSection/HeroSection";
import TitleMain from "./components/HeroSection/TitleMain";
import MouseLight from "./components/MouseLight/MouseLight";
import Background from "./components/Background/Background";
import Intro3D from "./components/Intro/Intro3D";
import IntroText from "./components/Intro/IntroText";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas className="w-full h-full">
        <MouseLight />

        <Background />
        <ScrollControls pages={4} damping={0.15}>
          {/* 3D content */}
          <Scroll>
            <group position={[0, 0, 0]}>
              <HeroSection />
            </group>
            <group position={[0, -8, 0]}>
              <Intro3D />
            </group>
          </Scroll>

          {/* HTML that scrolls by page */}
          <Scroll html>
            {/* Page 1: title */}
            <section style={{ height: "100vh" }}>
              <TitleMain />
            </section>
            <section style={{ height: "100vh" }}>
              <IntroText />
            </section>

            <section style={{ height: "auto" }}></section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
