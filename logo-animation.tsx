"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, PerspectiveCamera, Environment, Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function LogoAnimation() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 14]} fov={50} />
        <Environment preset="studio" />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <LogoLetters />
        <StarField />
      </Canvas>
    </div>
  );
}

function LogoLetters() {
  const group = useRef();
  const radius = 5;
  const matcapTexture = useTexture("/assets/3d/texture_earth.jpg");

  const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
    color: new THREE.Color("#ffffff"),
  });

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  // Create array of characters with proper spacing
  const text = "AI ART TODAY";
  const letterSpacing = 0.25;
  const wordSpacing = 0.25;
  const startAngle = -0.4;
  const arcLength = 0.8;

  // Calculate positions for each character
  const characters = text.split("").map((char, i) => {
    let totalSpacing = i * letterSpacing;

    const previousSpaces = text
      .slice(0, i)
      .split("")
      .filter((c) => c === " ").length;
    totalSpacing += previousSpaces * wordSpacing;

    const angle = startAngle + totalSpacing * arcLength;

    // Create unique oscillation parameters for each letter
    const speedMultiplier = 1.8 + ((i * 0.1) % 0.4); // Values between 0.8 and 1.2
    const floatIntensity = 1.3 + ((i * 0.07) % 0.2); // Values between 0.3 and 0.5
    const rotationIntensity = 1.2 + ((i * 0.05) % 0.1); // Values between 0.2 and 0.3

    return {
      char,
      angle,
      isSpace: char === " ",
      speedMultiplier,
      floatIntensity,
      rotationIntensity,
    };
  });

  return (
    <group ref={group}>
      {characters.map((char, i) => {
        if (char.isSpace) return null;

        const x = Math.sin(char.angle) * radius;
        const z = Math.cos(char.angle) * radius;
        const y = Math.sin(char.angle * 2) * 0.5;

        const rotationY = Math.atan2(x, z);

        return (
          <Float
            key={i}
            speed={2 * char.speedMultiplier} // Faster base speed with variation
            rotationIntensity={char.rotationIntensity}
            floatIntensity={char.floatIntensity}
            position={[x, y, z]}
          >
            <Text3D
              font="/fonts/Inter_Bold.json"
              size={0.8}
              height={0.2}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelOffset={0}
              bevelSegments={5}
              rotation={[0, rotationY, 0]}
              material={material}
            >
              {char.char}
            </Text3D>
          </Float>
        );
      })}
    </group>
  );
}

function StarField() {
  const count = 2000;
  const points = useRef();

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 20;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    colors[i * 3] = 1;
    colors[i * 3 + 1] = 1;
    colors[i * 3 + 2] = 1;
  }

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x -= delta * 0.05;
      points.current.rotation.y -= delta * 0.075;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} sizeAttenuation={true} transparent opacity={0.6} color="#ffffff" />
    </points>
  );
}
