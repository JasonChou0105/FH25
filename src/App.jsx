// App.jsx
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Stars } from "@react-three/drei";
import { useEffect } from "react";
import "./App.css";

import HeroSection from "./components/HeroSection/HeroSection";
import TitleMain from "./components/HeroSection/TitleMain";
import MouseLight from "./components/MouseLight/MouseLight";
import Background from "./components/Background/Background";
import Intro3D from "./components/Intro/Intro3D";
import IntroText from "./components/Intro/IntroText";
import Recap3D from "./components/Recap/Recap3d";

export default function App() {
  // 🔧 Ensure proper pixel ratio after hydration
  useEffect(() => {
    const handleResize = () => {
      const canvases = document.querySelectorAll("canvas");
      canvases.forEach((c) => {
        c.width = window.innerWidth * window.devicePixelRatio;
        c.height = window.innerHeight * window.devicePixelRatio;
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-screen h-screen">
      <Canvas
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        dpr={Math.min(window.devicePixelRatio || 1, 2)}
        onCreated={({ gl }) => {
          gl.setPixelRatio(window.devicePixelRatio || 1);
          gl.setSize(window.innerWidth, window.innerHeight);
        }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
        }}
      >
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
            <group position={[0, -16, 0]}>
              <Recap3D />
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
