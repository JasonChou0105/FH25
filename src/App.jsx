// App.jsx
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Stars } from "@react-three/drei";
import "./App.css";

import HeroSection from "./components/HeroSection/HeroSection";
import TitleMain from "./components/HeroSection/TitleMain";
import MouseLight from "./components/MouseLight/MouseLight";
import Background from "./components/Background/Background";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas className="w-full h-full">
        <MouseLight />

        <Background />
        <ScrollControls pages={4} damping={0.15}>
          {/* 3D content that scrolls */}
          <Scroll>
            {/* Page 1: your hero 3D content */}
            <group position={[0, 0, 0]}>
              <HeroSection />
            </group>
            {/* Page 2: intentionally empty in 3D */}
          </Scroll>

          {/* HTML that scrolls by page */}
          <Scroll html>
            {/* Page 1: title */}
            <section style={{ height: "auto" }}>
              <TitleMain />
              <TitleMain />
              <TitleMain />
              <TitleMain />
              <TitleMain />
              <TitleMain />
              <TitleMain />
              <TitleMain />
              <TitleMain />
              <TitleMain />
            </section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
