import { Canvas } from "@react-three/fiber";
import "./App.css";
import HeroSection from "./components/HeroSection/HeroSection";
import TitleMain from "./components/HeroSection/TitleMain";
import MouseLight from "./components/MouseLight/MouseLight";

function App() {
  return (
    <div className="relative w-screen h-screen">
      {/*main content  */}
      <div className="flex flex-col z-50">
        <TitleMain />
      </div>

      {/*3d content  */}
      <Canvas className="!w-screen !h-screen !min-h-screen !absolute inset-0">
        <HeroSection />
        <MouseLight />
      </Canvas>
    </div>
  );
}

export default App;
