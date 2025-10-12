import { Suspense } from "react";
import Moon from "../3dAssets/Moon";
import Satellite1 from "../3dAssets/Satellite1";

function Intro3D() {
  return (
    <>
      <Suspense fallback={null}>
        {/* <Astronaut position={[-0.5, -0.3, 2.5]} scale={0.0001} /> */}
        <Satellite1
          position={[-1, 0, 4]}
          lightOffset={[6.3, 4, -6]}
          scale={0.007}
          intensity={1}
        />
        <Moon
          position={[4.5, -2.6, -1]}
          lightOffset={[-1.2, 1.7, 1]}
          scale={0.12}
          intensity={0.3}
        />
      </Suspense>
    </>
  );
}

export default Intro3D;
