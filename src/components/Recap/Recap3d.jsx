import { Suspense, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import Moon from "../3dAssets/Moon";
import Earth from "../3dAssets/Earth";

function Recap3D() {
  const [moonPositions, setMoonPositions] = useState([]);

  // Animate moon positions to create orbital motion
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const rotationSpeed = 0.08;
    
    // Calculate new positions for each moon
    const newPositions = moons.map((moon) => {
      const radian = (moon.angle * Math.PI) / 180 + (time * rotationSpeed);
      const x = Math.cos(radian) * moon.orbitDistance;
      const y = moon.heightOffset;
      const z = Math.sin(radian) * moon.orbitDistance;
      return { x, y, z };
    });
    
    setMoonPositions(newPositions);
  });

  // Central planet position
  // Moons revolving around the planet - 360 degrees with staggered spacing
  const moons = [
    {
      text: "100+ participants",
      angle: 0, // 0 degrees
      heightOffset: 0.3,
      scale: 0.1,
      orbitDistance: 4.3,
    },
    {
      text: "30+ projects",
      angle: 72, // 72 degrees
      heightOffset: -0.2,
      scale: 0.1,
      orbitDistance: 4.7,
    },
    {
      text: "20+ sponsors",
      angle: 144, // 144 degrees
      heightOffset: 0.5,
      scale: 0.1,
      orbitDistance: 4.4,
    },
    {
      text: "1000+ dollars in prizes",
      angle: 216, // 216 degrees
      heightOffset: -0.4,
      scale: 0.1,
      orbitDistance: 4.6,
    },
    {
      text: "10000+ lines of code",
      angle: 288, // 288 degrees
      heightOffset: 0.1,
      scale: 0.1,
      orbitDistance: 4.5,
    },
  ];

  return (
    <>
      <Suspense fallback={null}>
        {/* Central Red Planet */}
        <Earth
          position={[0, 0, -3]}
          lightOffset={[0, 0, 2]}
          scale={0.12}
          intensity={2}
        />

        {/* Moons with animated positions - no group rotation */}
        {moonPositions.map((position, index) => (
          <group key={index} position={[position.x, position.y + 2 - 3, position.z - 3]}>
            {/* Moon */}
            <Moon
              position={[0, 0, 0]}
              scale={moons[index].scale}
              lightOffset={[0, 1, 2.2]}
              intensity={0.7}
            />

            {/* Text attached to moon - positioned above it */}
            <Text
              position={[0, 1.1, 1]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/Bitcount.ttf"
              maxWidth={2.5}
            >
              {moons[index].text}
            </Text>
          </group>
        ))}
      </Suspense>
    </>
  );
}

export default Recap3D;
