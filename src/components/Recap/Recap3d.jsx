import { Suspense } from "react";
import { useHorizontalScroll } from "../../hooks/useHorizontalScroll";
import PlanetRecap3D from "./RecapComponents/PlanetRecap3D";

function Recap3D() {
  const { horizontalOffset } = useHorizontalScroll(false);

  return (
    <>
      <group position={[horizontalOffset, -16, 0]}>
        <Suspense fallback={null}>
          <PlanetRecap3D />
        </Suspense>
      </group>
      <group position={[horizontalOffset - 20, -16, 0]}>
        <Suspense fallback={null}>
          <PlanetRecap3D />
        </Suspense>
      </group>
      <group position={[horizontalOffset + 20, -16, 0]}>
        <Suspense fallback={null}>
          <PlanetRecap3D />
        </Suspense>
      </group>
    </>
  );
}

export default Recap3D;
