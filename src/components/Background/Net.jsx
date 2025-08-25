// NetBackground.jsx
// Irregular polygon net with moving points and dynamic bonds (links break/form over time).
// npm i delaunator three @react-three/fiber
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useLayoutEffect, useRef } from "react";
import Delaunator from "delaunator";

const HALF_W = 16;
const HALF_H = 9;
const NUM_POINTS = 100;
const MIN_DIST = 0.1;
const NODE_SCALE = 0.025;
const LINK_RADIUS_BASE = 0.004;
const LINK_RADIUS_MAX = 0.008;
const Z_MIN = -4;
const Z_MAX = 0;

const SPEED_X = 0.002;
const SPEED_Y = 0.002;
const SPEED_Z = 0.001;
const REBUILD_INTERVAL = 1.3; // seconds between Delaunay recompute

// NEW: stronger, more opaque look
const NODE_COLOR = "#b0b0b0";
const LINK_COLOR = "#d0d0d0";

function poissonLikePoints(count, minDist) {
  const pts = [];
  const maxTries = count * 30;
  let tries = 0;
  while (pts.length < count && tries < maxTries) {
    tries++;
    const x = THREE.MathUtils.randFloatSpread(HALF_W * 2);
    const y = THREE.MathUtils.randFloatSpread(HALF_H * 2);
    const ok = pts.every(
      (p) => (p.x - x) ** 2 + (p.y - y) ** 2 >= minDist * minDist
    );
    if (ok) {
      const z = THREE.MathUtils.randFloat(Z_MIN, Z_MAX);
      pts.push(new THREE.Vector3(x, y, z));
    }
  }
  while (pts.length < count) {
    const x = THREE.MathUtils.randFloatSpread(HALF_W * 2);
    const y = THREE.MathUtils.randFloatSpread(HALF_H * 2);
    const z = THREE.MathUtils.randFloat(Z_MIN, Z_MAX);
    pts.push(new THREE.Vector3(x, y, z));
  }
  return pts;
}

function makeCylinderBetween(a, b, radius) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize()
  );
  const scale = new THREE.Vector3(radius, len / 2, radius); // cylinder height = 2
  return { position: mid, quaternion: quat, scale, len };
}

function buildDelaunayEdges(points) {
  const pts2 = points.map((p) => [p.x, p.y]);
  const d = Delaunator.from(pts2);
  const tris = d.triangles;
  const edges = new Set();
  const key = (i, j) => (i < j ? `${i}-${j}` : `${j}-${i}`);
  for (let t = 0; t < tris.length; t += 3) {
    const a = tris[t],
      b = tris[t + 1],
      c = tris[t + 2];
    edges.add(key(a, b));
    edges.add(key(b, c));
    edges.add(key(c, a));
  }
  const pairsIdx = [];
  for (const k of edges) {
    const [i, j] = k.split("-").map(Number);
    pairsIdx.push([i, j]);
  }
  return pairsIdx;
}

export default function Net() {
  // positions (mutable) and velocities
  const points = useMemo(() => poissonLikePoints(NUM_POINTS, MIN_DIST), []);
  const velocities = useMemo(() => {
    const v = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      v.push(
        new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(SPEED_X),
          THREE.MathUtils.randFloatSpread(SPEED_Y),
          THREE.MathUtils.randFloatSpread(SPEED_Z)
        )
      );
    }
    return v;
  }, []);

  // edges as index pairs; capacity ~ 3N is enough for planar Delaunay
  const linkIndexPairsRef = useRef(buildDelaunayEdges(points));
  const nodesRef = useRef();
  const linksRef = useRef();
  const timeSinceRebuild = useRef(0);

  // allocate link instances to a safe max; actual count is set each update
  const MAX_LINKS = useMemo(() => Math.ceil(NUM_POINTS * 3.2), []);

  useLayoutEffect(() => {
    if (!nodesRef.current || !linksRef.current) return;

    // initial node transforms
    {
      const m = new THREE.Matrix4();
      const q = new THREE.Quaternion();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        m.compose(p, q, new THREE.Vector3(NODE_SCALE, NODE_SCALE, NODE_SCALE));
        nodesRef.current.setMatrixAt(i, m);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }

    // initial link transforms
    {
      const m = new THREE.Matrix4();
      const pairs = linkIndexPairsRef.current;
      const N = Math.min(pairs.length, MAX_LINKS);
      for (let i = 0; i < N; i++) {
        const [ia, ib] = pairs[i];
        const { position, quaternion, scale } = makeCylinderBetween(
          points[ia],
          points[ib],
          LINK_RADIUS_BASE
        );
        m.compose(position, quaternion, scale);
        linksRef.current.setMatrixAt(i, m);
      }
      linksRef.current.count = N;
      linksRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [points, MAX_LINKS]);

  // animation loop: move points, bounce at bounds, periodically rebuild bonds; always update instance matrices
  useFrame((_, dt) => {
    if (!nodesRef.current || !linksRef.current) return;

    // 1) Move points with small velocities and bounce within bounds
    const q = new THREE.Quaternion();
    const m = new THREE.Matrix4();
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const v = velocities[i];

      p.x += v.x;
      p.y += v.y;
      p.z += v.z;

      if (p.x < -HALF_W || p.x > HALF_W) {
        p.x = THREE.MathUtils.clamp(p.x, -HALF_W, HALF_W);
        v.x *= -1;
      }
      if (p.y < -HALF_H || p.y > HALF_H) {
        p.y = THREE.MathUtils.clamp(p.y, -HALF_H, HALF_H);
        v.y *= -1;
      }
      if (p.z < Z_MIN || p.z > Z_MAX) {
        p.z = THREE.MathUtils.clamp(p.z, Z_MIN, Z_MAX);
        v.z *= -1;
      }

      // slight drift noise
      v.x += THREE.MathUtils.randFloatSpread(0.0004);
      v.y += THREE.MathUtils.randFloatSpread(0.0004);
      v.z += THREE.MathUtils.randFloatSpread(0.0002);

      // keep speeds bounded
      v.x = THREE.MathUtils.clamp(v.x, -SPEED_X, SPEED_X);
      v.y = THREE.MathUtils.clamp(v.y, -SPEED_Y, SPEED_Y);
      v.z = THREE.MathUtils.clamp(v.z, -SPEED_Z, SPEED_Z);

      // update node instance transform
      m.compose(p, q, new THREE.Vector3(NODE_SCALE, NODE_SCALE, NODE_SCALE));
      nodesRef.current.setMatrixAt(i, m);
    }
    nodesRef.current.instanceMatrix.needsUpdate = true;

    // 2) Periodically rebuild Delaunay edges (bonds) so links break/form
    timeSinceRebuild.current += dt;
    if (timeSinceRebuild.current >= REBUILD_INTERVAL) {
      linkIndexPairsRef.current = buildDelaunayEdges(points);
      timeSinceRebuild.current = 0;
    }

    // 3) Update link instance transforms based on current pairs and positions
    const pairs = linkIndexPairsRef.current;
    const N = Math.min(pairs.length, MAX_LINKS);
    for (let i = 0; i < N; i++) {
      const [ia, ib] = pairs[i];
      const a = points[ia];
      const b = points[ib];
      const { position, quaternion, scale, len } = makeCylinderBetween(
        a,
        b,
        LINK_RADIUS_BASE
      );
      const t = THREE.MathUtils.clamp(1 - len / 2.0, 0, 1);
      const r = THREE.MathUtils.lerp(LINK_RADIUS_BASE, LINK_RADIUS_MAX, t);
      m.compose(position, quaternion, new THREE.Vector3(r, scale.y, r));
      linksRef.current.setMatrixAt(i, m);
    }
    // hide any leftover instances
    const hide = new THREE.Matrix4().makeScale(0, 0, 0);
    for (let i = N; i < MAX_LINKS; i++) linksRef.current.setMatrixAt(i, hide);

    linksRef.current.count = N;
    linksRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={nodesRef} args={[null, null, points.length]}>
        <sphereGeometry args={[1, 10, 10]} />
        {/* More opaque/visible: emissive + disable toneMapping. Fully opaque by default. */}
        <meshStandardMaterial
          color={NODE_COLOR}
          roughness={0.6}
          metalness={0}
          emissive={NODE_COLOR}
          emissiveIntensity={0.1}
          transparent={false}
          opacity={0.2}
          depthWrite
          toneMapped={false}
        />
      </instancedMesh>

      <instancedMesh ref={linksRef} args={[null, null, MAX_LINKS]}>
        <cylinderGeometry args={[1, 1, 2, 6]} />
        {/* Lines: slightly dimmer emissive so nodes pop */}
        <meshStandardMaterial
          color={LINK_COLOR}
          roughness={0.7}
          metalness={0.5}
          transparent={false}
          opacity={0.5}
          depthWrite
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

// Example usage:
// <Canvas camera={{ position: [0, 0, 6], fov: 50 }} style={{ position: "fixed", inset: 0 }}>
//   <Net />
// </Canvas>
