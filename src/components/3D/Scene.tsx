import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import React from "react";
import { useAppSelector } from "@/redux/hooks";

const FloatingText = ({ textColor = "#ffffff" }) => {
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!textRef.current) return;
    textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + 5;
  });

  return (
    <Text ref={textRef} fontSize={2} color={textColor} material-metalness={0.8} material-roughness={0.2}>
      AI ART TODAY
    </Text>
  );
};

const Building = ({
  position,
  height,
  width,
  buildingColor = "#404060",
}: {
  position: [number, number, number];
  height: number;
  width: number;
  buildingColor?: string;
}) => {
  const isDarkTheme = buildingColor !== "#D3D3D3"; // Simple check if we're in dark mode
  const windowColor = isDarkTheme ? "#ffff99" : "#87CEFA"; // Yellow for night, light blue for day
  const windowSize = width * 0.2;
  const windowSpacing = width * 0.4;
  const floorsCount = Math.floor(height / 0.5);

  return (
    <group position={position}>
      {/* Main building structure */}
      <mesh>
        <boxGeometry args={[width, height, width]} />
        <meshStandardMaterial color={buildingColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Windows */}
      {Array.from({ length: floorsCount })
        .map((_, floorIndex) => {
          // Calculate y position for this floor's windows
          const floorY = -height / 2 + (floorIndex + 0.5) * (height / floorsCount);

          // Create windows on each side of the building
          return [0, 1, 2, 3].map((side) => {
            // Calculate rotation and position for each side
            const rotation: [number, number, number] = [0, (side * Math.PI) / 2, 0];
            const offset = width / 2 + 0.001; // Slightly outside the building

            // Position based on side (front, right, back, left)
            const sidePosition: [number, number, number] = [
              side % 2 === 0 ? 0 : side === 1 ? offset : -offset,
              floorY,
              side % 2 === 1 ? 0 : side === 0 ? offset : -offset,
            ];

            // Randomly decide if this window is lit (more likely at night)
            const isLit = Math.random() < (isDarkTheme ? 0.7 : 0.3);

            return (
              <mesh key={`window-${floorIndex}-${side}`} position={sidePosition} rotation={rotation}>
                <planeGeometry args={[windowSize, windowSize]} />
                <meshStandardMaterial
                  color={isLit ? windowColor : "#333333"}
                  emissive={isLit ? windowColor : "#000000"}
                  emissiveIntensity={isLit ? 0.5 : 0}
                  transparent={true}
                  opacity={0.9}
                />
              </mesh>
            );
          });
        })
        .flat()}
    </group>
  );
};

const City = ({ groundColor = "#303030", buildingColor = "#404060" }) => {
  const buildings = [];
  const gridSize = 5;

  for (let x = -gridSize; x <= gridSize; x++) {
    for (let z = -gridSize; z <= gridSize; z++) {
      const height = Math.random() * 3 + 1;
      const width = Math.random() * 0.5 + 0.5;
      const position: [number, number, number] = [x * 2, height / 2, z * 2];

      buildings.push(
        <Building
          key={`building-${x}-${z}`}
          position={position}
          height={height}
          width={width}
          buildingColor={buildingColor}
        />
      );
    }
  }

  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color={groundColor} />
      </mesh>
      {buildings}
    </group>
  );
};

const Scene = () => {
  const { selectedTheme } = useAppSelector((state: any) => state.theme);
  const isDarkTheme = selectedTheme === "dark";

  // Colors based on theme
  const backgroundColor = isDarkTheme ? "#000000" : "#87CEEB"; // Black for night, sky blue for day
  const fogColor = isDarkTheme ? "#000000" : "#87CEEB";
  const groundColor = isDarkTheme ? "#303030" : "#228B22"; // Dark gray for night, forest green for day
  const buildingColor = isDarkTheme ? "#404060" : "#D3D3D3"; // Dark blue-gray for night, light gray for day
  const textColor = isDarkTheme ? "#ffffff" : "#000000"; // White for night, black for day
  const lightIntensity = isDarkTheme ? 0.5 : 1.2; // Dimmer for night, brighter for day
  const environmentPreset = isDarkTheme ? "night" : "city";

  return (
    <Canvas
      gl={{ antialias: true }}
      dpr={[1, 2]}
      camera={{
        position: [10, 10, 10],
        fov: 45,
      }}
    >
      <color attach="background" args={[backgroundColor]} />
      <fog attach="fog" args={[fogColor, 10, 50]} />
      <Environment preset={environmentPreset} />
      <ambientLight intensity={lightIntensity} />
      <directionalLight position={[5, 5, 5]} intensity={isDarkTheme ? 0.8 : 1.5} />

      {/* Pass theme-based props to components */}
      <FloatingText textColor={textColor} />
      <City groundColor={groundColor} buildingColor={buildingColor} />

      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} maxPolarAngle={Math.PI / 2} makeDefault />
    </Canvas>
  );
};

export default Scene;
