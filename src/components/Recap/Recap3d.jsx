import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import Moon from "../3dAssets/Moon";
import Earth from "../3dAssets/Earth";

function Recap3D() {
  const orbitRef = useRef();

  // Animate the entire orbit group rotating around the planet
  useFrame(({ clock }, dt) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += 0.05 * dt; // Slow rotation
    }
  });

  // Central planet position
  const planetPosition = [0, -1, -3];
  // Moons revolving around the planet - 360 degrees with staggered spacing
  const moons = [
    { 
      text: "Moon 1", 
      angle: 0,           // 0 degrees
      heightOffset: 0.3,  
      scale: 0.1,
      orbitDistance: 4.3
    },
    { 
      text: "Moon 2", 
      angle: 72,          // 72 degrees
      heightOffset: -0.2, 
      scale: 0.1,
      orbitDistance: 4.7
    },
    { 
      text: "Moon 3", 
      angle: 144,         // 144 degrees
      heightOffset: 0.5,  
      scale: 0.1,
      orbitDistance: 4.4
    },
    { 
      text: "Moon 4", 
      angle: 216,         // 216 degrees
      heightOffset: -0.4, 
      scale: 0.1,
      orbitDistance: 4.6
    },
    { 
      text: "Moon 5", 
      angle: 288,         // 288 degrees
      heightOffset: 0.1,  
      scale: 0.1,
      orbitDistance: 4.5
    },
  ];


  return (
    <>
      <Suspense fallback={null}>
        {/* Central Red Planet */}
        <Earth
          position={planetPosition}
          lightOffset={[0, 0, 2]}
          scale={0.1}
          intensity={2}
        />

        {/* Orbit group that rotates around the planet */}
        <group ref={orbitRef} position={planetPosition}>
          {/* Moons orbiting around the planet */}
          {moons.map((moon, index) => {
            // Calculate position relative to center (0,0,0) since group is already at planetPosition
            const radian = (moon.angle * Math.PI) / 180;
            const x = Math.cos(radian) * moon.orbitDistance;
            const y = moon.heightOffset;
            const z = Math.sin(radian) * moon.orbitDistance;
            
            return (
              <group key={index} position={[x, y+2, z]}>
                {/* Moon */}
                <Moon
                  position={[0, 0, 0]}
                  scale={moon.scale}
                  lightOffset={[0, 1, 1]}
                  intensity={0.4}
                />
                
                {/* Text attached to moon - positioned above it */}
                <Text
                  position={[0, 1.1, 1]}
                  fontSize={0.25}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={0.02}
                  outlineColor="black"
                >
                  {moon.text}
                </Text>
              </group>
            );
          })}
        </group>
      </Suspense>
    </>
  );
}

export default Recap3D;

