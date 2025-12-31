// SponsorTile3D.jsx (copy-paste)
import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { RoundedBox, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const LOGO_URL = "/images/Sponsers/Hack_Club_Flag_Standalone.svg";

export default function SponsorTile3D({ sponsor, w, h, x, y, z }) {
  const [hovered, setHovered] = useState(false);
  const g = useRef();

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

  const depth = 0.3;
  const logoZ = depth / 2 + 0.002;

  // base + hover targets
  const baseZ = z - 0.5;
  const hoverLift = 0.18; // how much to lift in Z on hover
  const targetZ = hovered ? baseZ + hoverLift : baseZ;
  const targetScale = hovered ? 1.03 : 1;

  // smooth transition (position + scale)
  useFrame((_, dt) => {
    if (!g.current) return;
    g.current.position.z = THREE.MathUtils.damp(
      g.current.position.z,
      targetZ,
      12,
      dt
    );
    const s = THREE.MathUtils.damp(g.current.scale.x, targetScale, 12, dt);
    g.current.scale.setScalar(s);
  });

  return (
    <group ref={g} position={[x, y, baseZ]}>
      <RoundedBox
        args={[w, h, depth]}
        radius={0.2}
        smoothness={0.1}
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
