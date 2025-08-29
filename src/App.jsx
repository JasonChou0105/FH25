// App.jsx
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import "./App.css";

import HeroSection from "./components/HeroSection/HeroSection";
import TitleMain from "./components/HeroSection/TitleMain";
import MouseLight from "./components/MouseLight/MouseLight";
import Net from "./components/Background/Net";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas className="w-full h-full">
        <Net />
        <MouseLight />

        <ScrollControls pages={2} damping={0.15}>
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
            <section style={{ height: "100vh" }}>
              <TitleMain />
            </section>

            {/* Page 2: empty spacer so page 1 can scroll away */}
            <div style={{ height: "100vh" }} />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
