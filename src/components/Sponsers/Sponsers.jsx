// components/Sponsers/Sponsers.jsx
import React, { useMemo } from "react";

const tierOrder = ["gold", "silver", "bronze", "other"];
const tierLabels = {
  gold: "GOLD SPONSORS",
  silver: "SILVER SPONSORS",
  bronze: "BRONZE SPONSORS",
  other: "OTHER SPONSORS",
};

const tileSpec = {
  gold: { w: 12, h: 1.7, cols: 1, count: 2 },
  silver: { w: 6, h: 1.45, cols: 2, count: 4 },
  bronze: { w: 4, h: 1.3, cols: 3, count: 6 },
  other: { w: 3, h: 1.15, cols: 4, count: 5 },
};

// These must match Sponsors3D.jsx
const gapY = 0.6;
const titleGap = 0.9;
const sectionGap = 1.4;

// You will tweak these two once and it will lock in:
const pxPerWorldY = 22; // how many pixels per 1 world unit in Y
const baseTopPx = 160; // where worldY=0 lands on screen

export default function Sponsers() {
  const titleRows = useMemo(() => {
    let cursorY = 0;
    const rows = [];

    for (const tier of tierOrder) {
      const { h, cols, count } = tileSpec[tier];
      if (!count) continue;

      // Title is at cursorY
      const topPx = baseTopPx + -cursorY * pxPerWorldY;

      rows.push({ tier, label: tierLabels[tier], topPx });

      // Move into tiles
      cursorY -= titleGap;

      const r = Math.ceil(count / cols);
      cursorY -= r * (h + gapY) - gapY;
      cursorY -= sectionGap;
    }

    return rows;
  }, []);

  return (
    // <div
    //   style={{
    //     zIndex: 10,
    //   }}
    // >
    //   {titleRows.map((t) => (
    //     <div
    //       key={t.tier}
    //       style={{
    //         color: "white",
    //         fontWeight: 700,
    //         letterSpacing: "0.08em",
    //         fontSize: 18,
    //         textShadow: "0 2px 12px rgba(0,0,0,0.45)",
    //         whiteSpace: "nowrap",
    //       }}
    //     >
    //       {t.label}
    //     </div>
    //   ))}
    // </div>
    <></>
  );
}
