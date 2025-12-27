import { Suspense } from "react";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";
import PlanetRecap3D from "./RecapComponents/PlanetRecap3D";
import RecapText3D from "./RecapComponents/RecapText/RecapText3D";
import RecapProjects3D from "./RecapComponents/RecapProjects/RecapProjects3D";

function Recap3D() {
  const { horizontalOffset } = useHorizontalScroll(false);

  return (
    <>
      <group position={[horizontalOffset, -16, 0]}>
        <Suspense fallback={null}>
          <RecapText3D />
        </Suspense>
      </group>
      <group position={[horizontalOffset - 20, -16, 0]}>
        <Suspense fallback={null}>
          <PlanetRecap3D />
        </Suspense>
      </group>
      <group position={[horizontalOffset + 20, -16, 0]}>
        <Suspense fallback={null}>
          <RecapProjects3D />
        </Suspense>
      </group>
    </>
  );
}

export default Recap3D;
