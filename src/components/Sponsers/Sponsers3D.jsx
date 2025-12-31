// components/Sponsers/Sponsors3D.jsx
import * as THREE from "three";
import { useMemo } from "react";
import { Text } from "@react-three/drei";
import SponsorTile3D from "./SponsersTile3D";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const sponsors = [
  // GOLD (2)
  { id: 1, tier: "gold", link: "https://gold1.com" },
  { id: 2, tier: "gold", link: "https://gold2.com" },

  // SILVER (4)
  { id: 3, tier: "silver", link: "https://silver1.com" },
  { id: 4, tier: "silver", link: "https://silver2.com" },
  { id: 5, tier: "silver", link: "https://silver3.com" },
  { id: 6, tier: "silver", link: "https://silver4.com" },

  // BRONZE (6)
  { id: 7, tier: "bronze", link: "https://bronze1.com" },
  { id: 8, tier: "bronze", link: "https://bronze2.com" },
  { id: 9, tier: "bronze", link: "https://bronze3.com" },
  { id: 10, tier: "bronze", link: "https://bronze4.com" },
  { id: 11, tier: "bronze", link: "https://bronze5.com" },
  { id: 12, tier: "bronze", link: "https://bronze6.com" },

  // OTHER (5)
  { id: 13, tier: "other", link: "https://other1.com" },
  { id: 14, tier: "other", link: "https://other2.com" },
  { id: 15, tier: "other", link: "https://other3.com" },
  { id: 16, tier: "other", link: "https://other4.com" },
  { id: 17, tier: "other", link: "https://other5.com" },
];

const tierOrder = ["gold", "silver", "bronze", "other"];
const tierLabels = {
  gold: "Gold Sponsers",
  silver: "Silver Sponsers",
  bronze: "Bronze Sponsers",
  other: "Other Sponsers",
};

// sizes + columns
const tileSpec = {
  gold: { w: 12, h: 1.7, cols: 1 },
  silver: { w: 6, h: 1.45, cols: 2 },
  bronze: { w: 4, h: 1.3, cols: 3 },
  other: { w: 3, h: 1.15, cols: 4 },
};
const tierAccent = {
  gold: "#ffefba",
  silver: "#ebebeb",
  bronze: "#e8bc90",
  other: "#ffffff",
};

function groupByTier(list) {
  return list.reduce((acc, s) => {
    (acc[s.tier] ||= []).push(s);
    return acc;
  }, {});
}

const UnderlineFadeMaterial = shaderMaterial(
  {
    uColor: new THREE.Color("#ffffff"),
    uOpacity: 1.0,
    uPowerY: 2.2, // vertical fade curve
    uFeatherX: 0.18, // left/right edge softness (0.08–0.30)
    uFeatherY: 0.08, // soften top edge a bit too (0.03–0.15)
  },
  // vertex
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // fragment
  `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uPowerY;
  uniform float uFeatherX;
  uniform float uFeatherY;
  varying vec2 vUv;

  float edgeFeather(float t, float feather) {
    // fades to 0 near 0 and 1, stays ~1 in the middle
    float left  = smoothstep(0.0, feather, t);
    float right = smoothstep(0.0, feather, 1.0 - t);
    return left * right;
  }

  void main() {
    // Vertical: solid at top -> fade down
    float vy = 1.0 - pow(1.0 - vUv.y, uPowerY);

    // Soften the top edge slightly too (avoid a hard cutoff at the top)
    float topSoft = smoothstep(0.0, uFeatherY, 1.0 - vUv.y);

    // Horizontal: fade on left/right edges
    float hx = edgeFeather(vUv.x, uFeatherX);

    float a = vy * hx * topSoft * uOpacity;

    gl_FragColor = vec4(uColor, a);
  }
  `
);

extend({ UnderlineFadeMaterial });

function UnderlineLight({ width, color, y }) {
  const fadeH = 4; // how far the fade goes downward
  const lineY = -0.22; // where the underline sits under the text

  return (
    <group position={[0, y, 0]}>
      {/* Visible underline that fades downward */}
      <mesh position={[0, lineY - fadeH * 0.5 + 0.03, 0.01]}>
        <planeGeometry args={[width, fadeH]} />
        <underlineFadeMaterial
          uColor={new THREE.Color(color)}
          uOpacity={0.25}
          uPower={0.6}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Real light source: thin, long, points down */}
      <rectAreaLight
        args={[color, 2, width, 0.18]} // color, intensity, width, height
        position={[0, lineY, 0.35]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

export default function Sponsors3D({ position = [0, -16, 0] }) {
  const grouped = useMemo(() => groupByTier(sponsors), []);

  const gapX = 0.4;
  const gapY = 0.6;
  const titleGap = 0.9;
  const sectionGap = 1.4;

  let cursorY = 0;
  const nodes = [];

  for (const tier of tierOrder) {
    const items = grouped[tier] || [];
    if (!items.length) continue;

    // title
    nodes.push(
      <Text
        font="/fonts/Roboto-Black.ttf"
        key={`${tier}-title`}
        position={[0, cursorY, 0]}
        fontSize={0.42}
        anchorX="center"
        anchorY="middle"
        color="#ffffff"
      >
        {tierLabels[tier]}
      </Text>
    );

    const { w, h, cols } = tileSpec[tier];
    const rows = Math.ceil(items.length / cols);
    // horizontally long light under the title, shining down onto the tiles
    nodes.push(
      <UnderlineLight
        key={`${tier}-underlineLight`}
        width={14}
        color={tierAccent[tier]}
        y={cursorY}
      />
    );

    // move down into tile area
    cursorY -= titleGap;

    const rowWidth = cols * w + (cols - 1) * gapX;
    const startX = -rowWidth / 2;

    items.forEach((s, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = startX + col * (w + gapX) + w / 2;
      const y = cursorY - row * (h + gapY) - h / 2;

      nodes.push(
        <SponsorTile3D key={s.id} sponsor={s} w={w} h={h} x={x} y={y} z={0} />
      );
    });

    cursorY -= rows * (h + gapY) - gapY;
    cursorY -= sectionGap;
  }

  return <group position={position}>{nodes}</group>;
}
