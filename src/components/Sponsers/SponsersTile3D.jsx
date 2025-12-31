// SponsorTile.jsx (copy-paste)
import * as THREE from "three";
import { useMemo, useState } from "react";
import { RoundedBox, useTexture } from "@react-three/drei";

const LOGO_URL = "/images/Sponsers/Hack_Club_Flag_Standalone.svg";

export default function SponsorTile3D({ sponsor, w, h, x, y, z }) {
  const [hovered, setHovered] = useState(false);

  const tex = useTexture(LOGO_URL);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;

  const open = () => window.open(sponsor.link, "_blank", "noopener,noreferrer");

  // keep logo aspect ratio (contain)
  const { imgW, imgH } = useMemo(() => {
    const iw = tex?.image?.width || 1;
    const ih = tex?.image?.height || 1;
    const padding = 0.82;

    const tileAspect = w / h;
    const imgAspect = iw / ih;

    if (imgAspect > tileAspect) {
      const width = w * padding;
      return { imgW: width, imgH: width / imgAspect };
    } else {
      const height = h * padding;
      return { imgW: height * imgAspect, imgH: height };
    }
  }, [tex, w, h]);

  const depth = 0.5;
  const logoZ = depth / 2 + 0.002; // tiny offset to avoid z-fighting

  return (
    <group position={[x, y, z - 0.5]}>
      {/* White beveled cuboid */}
      <RoundedBox
        args={[w, h, depth]}
        radius={0.3} // bevel amount
        smoothness={1}
        bevelSegments={1}
        steps={1}
        creaseAngle={0.9}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
        scale={hovered ? 1.03 : 1}
      >
        <meshStandardMaterial
          color="#ffffff"
          roughness={1}
          metalness={0}
          flatShading
        />
      </RoundedBox>

      {/* Transparent SVG overlay */}
      <mesh position={[0, 0, logoZ]}>
        <planeGeometry args={[imgW, imgH]} />
        <meshBasicMaterial
          map={tex}
          transparent
          toneMapped={false}
          opacity={hovered ? 0.95 : 1}
        />
      </mesh>
    </group>
  );
}
