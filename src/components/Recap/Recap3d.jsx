import { Suspense, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import Moon from "../3dAssets/Moon";
import Earth from "../3dAssets/Earth";
import Asteroid1 from "../3dAssets/Asteroid1";
import Asteroid2 from "../3dAssets/Asteroid2";

function Recap3D() {
  const [moonPositions, setMoonPositions] = useState([]);

  // Central planet position
  // Moon and asteroids with text revolving around the planet
  const orbitalObjects = [
    {
      type: "Moon",
      text: "last year we had...",
      angle: 0, // 0 degrees
      heightOffset: 0,
      scale: 0.12,
      orbitDistance: 4.3,
    },
    {
      type: "Asteroid1",
      text: "100+ participants",
      angle: 50, // 60 degrees
      heightOffset: -0.1,
      scale: 1.2,
      orbitDistance: 4.7,
    },
    {
      type: "Asteroid2",
      text: "30+ projects",
      angle: 110, // 120 degrees
      heightOffset: 0.05,
      scale: 2.8,
      orbitDistance: 4.4,
    },
    {
      type: "Asteroid1",
      text: "20+ sponsors",
      angle: 160, // 180 degrees
      heightOffset: -0.1,
      scale: 1.2,
      orbitDistance: 4.6,
    },
    {
      type: "Asteroid2",
      text: "1000+ dollars in prizes",
      angle: 210, // 240 degrees
      heightOffset: 0.5,
      scale: 2.8,
      orbitDistance: 4.5,
    },
    {
      type: "Asteroid1",
      text: "10000+ lines of code",
      angle: 270, // 300 degrees
      heightOffset: -0.1,
      scale: 1.2,
      orbitDistance: 4.8,
    },
    {
      type: "Asteroid2",
      text: "10+ judges",
      angle: 310, // 330 degrees
      heightOffset: 0.2,
      scale: 2.8,
      orbitDistance: 4.2,
    },
  ];

  // Animate orbital object positions to create orbital motion
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const rotationSpeed = 0.1;
    
    // Calculate new positions for all orbital objects
    const orbitalPositions = orbitalObjects.map((object) => {
      const radian = (object.angle * Math.PI) / 180 + (time * rotationSpeed);
      const x = Math.cos(radian) * object.orbitDistance;
      const y = object.heightOffset;
      const z = Math.sin(radian) * object.orbitDistance;
      return { x, y, z };
    });
    
    setMoonPositions(orbitalPositions);
  });

  return (
    <>
      <Suspense fallback={null}>
        {/* Central Red Planet */}
        <Earth
          position={[0, 1.5, -4]}
          lightOffset={[0, 0, 2]}
          scale={0.12}
          intensity={2}
        />

        {/* Orbital Belt */}
        <group>
          {/* Moon and asteroids with text */}
          {moonPositions.map((position, index) => (
            <group key={index} position={[position.x, position.y + 1.5, position.z - 3]}>
              {orbitalObjects[index].type === "Moon" ? (
                <group>
                  <Text
                    position={[0, 1.1, 1.2]}
                    fontSize={0.4}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Bitcount.ttf"
                    maxWidth={2.5}
                  >
                    {orbitalObjects[index].text}
                  </Text>
                  <Moon
                    position={[0, 0, 0]}
                    scale={orbitalObjects[index].scale}
                    lightOffset={[0, 1, 1.8]}
                    intensity={0.7}
                  />
                </group>
              ) : orbitalObjects[index].type === "Asteroid1" ? (
                <group>
                  <Text
                    position={[0, 0, 1]}
                    fontSize={0.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Bitcount.ttf"
                    maxWidth={2.5}
                  >
                    {orbitalObjects[index].text}
                  </Text>
                  <Asteroid1
                    position={[0, 0, 0]}
                    scale={orbitalObjects[index].scale}
                    lightOffset={[0, 0, 2.2]}
                    intensity={1.5}
                  />
                </group>  
              ) : (
                <group>
                  <Text
                    position={[0, 0.8, 1]}
                    fontSize={0.25}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    font="/fonts/Bitcount.ttf"
                    maxWidth={2.5}
                  >
                    {orbitalObjects[index].text}
                  </Text>
                  <Asteroid2
                    position={[0, 0, 0]}
                    scale={orbitalObjects[index].scale}
                    lightOffset={[-0.3, 0.8, 1.5]}
                    intensity={1.5}
                  />
                </group>
              )}
            </group>
          ))}
        </group>
      </Suspense>
    </>
  );
}

export default Recap3D;
