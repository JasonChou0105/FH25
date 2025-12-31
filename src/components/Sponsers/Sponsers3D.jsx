// components/Sponsers/Sponsors3D.jsx
import * as THREE from "three";
import { useMemo, useState } from "react";
import { Text, RoundedBox } from "@react-three/drei";
import SponsorTile3D from "./SponsersTile3D";

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
  gold: "GOLD SPONSORS",
  silver: "SILVER SPONSORS",
  bronze: "BRONZE SPONSORS",
  other: "OTHER SPONSORS",
};

// sizes + columns
const tileSpec = {
  gold: { w: 12, h: 1.7, cols: 1 },
  silver: { w: 6, h: 1.45, cols: 2 },
  bronze: { w: 4, h: 1.3, cols: 3 },
  other: { w: 3, h: 1.15, cols: 4 },
};

const tierAccent = {
  gold: "#D4AF37",
  silver: "#C0C0C0",
  bronze: "#CD7F32",
  other: "#7C8AA0",
};

function groupByTier(list) {
  return list.reduce((acc, s) => {
    (acc[s.tier] ||= []).push(s);
    return acc;
  }, {});
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

    nodes.push(
      <Text
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

    cursorY -= titleGap;

    const { w, h, cols } = tileSpec[tier];
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

    const rows = Math.ceil(items.length / cols);
    cursorY -= rows * (h + gapY) - gapY;
    cursorY -= sectionGap;
  }

  return <group position={position}>{nodes}</group>;
}
