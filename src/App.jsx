// App.jsx
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, AdaptiveDpr } from "@react-three/drei";
import { Suspense, lazy } from "react";
import "./App.css";

import HeroSection from "./components/HeroSection/HeroSection";
import TitleMain from "./components/HeroSection/TitleMain";
import MouseLight from "./components/MouseLight/MouseLight";
import Background from "./components/Background/Background";
import IntroText from "./components/Intro/IntroText";
import Recap3D from "./components/Recap/Recap3d";
import RecapText from "./components/Recap/RecapComponents/RecapText/RecapText";
import RecapProjects from "./components/Recap/RecapComponents/RecapProjects/RecapProjects";

// Lazy load heavy 3D components
const Intro3D = lazy(() => import("./components/Intro/Intro3D"));

// Component to wrap Recap3D scenes with horizontal offset

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
        <ambientLight
          color="#ffffff"
          intensity={0.1}
        />
        <AdaptiveDpr pixelated />
        <MouseLight />
        <Background />

        <ScrollControls pages={4} damping={0.15}>
          <Scroll>
            <group position={[0, 0, 0]}>
              <HeroSection />
            </group>
            <group position={[0, -8, 0]}>
              <Suspense fallback={null}>
                <Intro3D />
              </Suspense>
            </group>
            <Recap3D />
          </Scroll>

          {/* HTML overlay that scrolls */}
          <Scroll html>
            <section style={{ height: "100vh", width: "100vw" }}>
              <TitleMain />
            </section>
            <section style={{ height: "100vh", width: "100vw" }}>
              <IntroText />
            </section>
            <section className="flex flex-row items-start justify-between" style={{ height: "100vh", width: "180vw" }}>
              <RecapText />
              <RecapProjects />
            </section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
