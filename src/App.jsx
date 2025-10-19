// App.jsx
import { Canvas, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, AdaptiveDpr } from "@react-three/drei";
import { Suspense, lazy, useEffect } from "react";
import "./App.css";

import HeroSection from "./components/HeroSection/HeroSection";
import TitleMain from "./components/HeroSection/TitleMain";
import MouseLight from "./components/MouseLight/MouseLight";
import Background from "./components/Background/Background";
import IntroText from "./components/Intro/IntroText";

// Lazy load heavy 3D componentsW
const Intro3D = lazy(() => import("./components/Intro/Intro3D"));
const Recap3D = lazy(() => import("./components/Recap/Recap3d"));

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
        }}
      >
        <AdaptiveDpr pixelated />
        <MouseLight />
        <Background />

        <ScrollControls pages={4} damping={0.15}>
          {/* 3D content */}
          <Scroll>
            <group position={[0, 0, 0]}>
              <HeroSection />
            </group>
            <group position={[0, -8, 0]}>
              <Suspense fallback={null}>
                <Intro3D />
              </Suspense>
            </group>
            <group position={[0, -16, 0]}>
              <Suspense fallback={null}>
                <Recap3D />
              </Suspense>
            </group>
          </Scroll>

          {/* HTML overlay that scrolls */}
          <Scroll html>
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
