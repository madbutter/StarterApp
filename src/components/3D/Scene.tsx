"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

// Materials for lit and unlit windows
const litWindowMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffaa,
  emissive: 0xffffaa,
  emissiveIntensity: 0.5,
});

const unlitWindowMaterial = new THREE.MeshStandardMaterial({
  color: 0x111111,
  emissive: 0x000000,
  metalness: 0.8,
  roughness: 0.2,
});

// Interface for window data
interface WindowData {
  mesh: THREE.Mesh;
  isLit: boolean;
  nextUpdateTime: number;
}

// Function to create a building
function createBuilding(
  x: number, 
  z: number, 
  height: number, 
  width: number = 1, 
  color: number = 0x404060
): { building: THREE.Mesh, windows: WindowData[] } {
  const buildingGeometry = new THREE.BoxGeometry(width, height, width);
  const buildingMaterial = new THREE.MeshStandardMaterial({
    color: color,
    metalness: 0.8,
    roughness: 0.2,
  });
  const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
  building.position.set(x, height / 2 - 2, z);
  building.castShadow = true;
  building.receiveShadow = true;

  // Window properties
  const windowsPerSide = 3;
  const windowSize = width * 0.15;
  const windowSpacing = width * 0.25;
  const windowGeometry = new THREE.PlaneGeometry(windowSize, windowSize);
  
  const windows: WindowData[] = [];

  // Add windows to each floor
  const floorHeight = 0.8;
  for (let h = 1; h < height; h += floorHeight) {
    // For each side of the building
    for (let side = 0; side < 4; side++) {
      // Add three windows horizontally
      for (let w = 0; w < windowsPerSide; w++) {
        // Randomly decide if window is lit
        const isLit = Math.random() > 0.6;
        const windowMesh = new THREE.Mesh(
          windowGeometry,
          isLit ? litWindowMaterial : unlitWindowMaterial
        );

        // Calculate horizontal offset for window position
        const horizontalOffset = (w - 1) * windowSpacing;
        const offset = width / 2 + 0.01;

        // Position based on side (front, right, back, left)
        switch(side) {
          case 0: // front
            windowMesh.position.set(horizontalOffset, h - height/2, offset);
            break;
          case 1: // right
            windowMesh.position.set(offset, h - height/2, -horizontalOffset);
            windowMesh.rotation.y = Math.PI / 2;
            break;
          case 2: // back
            windowMesh.position.set(-horizontalOffset, h - height/2, -offset);
            windowMesh.rotation.y = Math.PI;
            break;
          case 3: // left
            windowMesh.position.set(-offset, h - height/2, horizontalOffset);
            windowMesh.rotation.y = -Math.PI / 2;
            break;
        }
        building.add(windowMesh);

        // Store window data with random initial update time
        windows.push({
          mesh: windowMesh,
          isLit,
          nextUpdateTime: Math.random() * 10000, // Random initial delay
        });
      }
    }
  }

  return { building, windows };
}

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    // Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Store all windows for animation
    const allWindows: WindowData[] = [];

    // Enhanced camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 5, 8); // Moved camera back to see more buildings
    camera.lookAt(0, 0, 0);

    // Renderer with better settings
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 30; // Increased to see more of the city
    controls.enablePan = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3; // Slowed down rotation

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Main directional light with shadows
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 2);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -10;
    mainLight.shadow.camera.right = 10;
    mainLight.shadow.camera.top = 10;
    mainLight.shadow.camera.bottom = -10;
    scene.add(mainLight);

    // Secondary lights
    const fillLight = new THREE.DirectionalLight(0x9999ff, 0.5);
    fillLight.position.set(-5, 2, -2);
    scene.add(fillLight);

    const topLight = new THREE.DirectionalLight(0xff99ff, 0.3);
    topLight.position.set(0, 5, 0);
    scene.add(topLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(40, 40); // Increased size for more buildings
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.2,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Create buildings in a grid
    const gridSize = 5;
    const spacing = 3;
    for (let x = -gridSize; x <= gridSize; x++) {
      for (let z = -gridSize; z <= gridSize; z++) {
        // Skip center area for the main cube
        if (Math.abs(x) < 2 && Math.abs(z) < 2) continue;
        
        const height = Math.random() * 5 + 2;
        const width = Math.random() * 0.5 + 0.5;
        const { building, windows } = createBuilding(
          x * spacing, 
          z * spacing, 
          height, 
          width,
          new THREE.Color(
            0.2 + Math.random() * 0.1,
            0.2 + Math.random() * 0.1,
            0.3 + Math.random() * 0.1
          ).getHex()
        );
        scene.add(building);
        allWindows.push(...windows);
      }
    }

    // Enhanced cube (central building)
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      metalness: 0.7,
      roughness: 0.2,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    scene.add(cube);

    // Add floating text
    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
      const textGeometry = new TextGeometry('AI ART TODAY', {
        font: font,
        size: 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });

      // Center the text
      textGeometry.computeBoundingBox();
      const textWidth = textGeometry.boundingBox!.max.x - textGeometry.boundingBox!.min.x;
      
      const textMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x000000, // Base emissive color
      });
      
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = -textWidth / 2;
      textMesh.position.y = 3;
      textMesh.position.z = -2;
      textMesh.castShadow = true;
      
      scene.add(textMesh);

      // Color animation parameters
      const colorCycle = {
        colors: [
          new THREE.Color(0xff3366), // Pink
          new THREE.Color(0x3366ff), // Blue
          new THREE.Color(0x33ff66), // Green
          new THREE.Color(0xff9933), // Orange
        ],
        currentIndex: 0,
        nextIndex: 1,
        progress: 0,
        speed: 0.005
      };

      // Window animation function
      function updateWindows(time: number) {
        allWindows.forEach(windowData => {
          if (time > windowData.nextUpdateTime) {
            // 10% chance to change state when it's time to update
            if (Math.random() < 0.1) {
              windowData.isLit = !windowData.isLit;
              windowData.mesh.material = windowData.isLit ? litWindowMaterial : unlitWindowMaterial;
            }
            // Set next update time (between 2 and 10 seconds from now)
            windowData.nextUpdateTime = time + 2000 + Math.random() * 8000;
          }
        });
      }

      // Update animation function to include window updates
      function animate(time: number) {
        requestAnimationFrame(animate);
        controls.update();

        // Update windows
        updateWindows(time);

        // Update text position and color
        textMesh.position.y = 3 + Math.sin(Date.now() * 0.001) * 0.2;

        // Update text color
        colorCycle.progress += colorCycle.speed;
        if (colorCycle.progress >= 1) {
          colorCycle.progress = 0;
          colorCycle.currentIndex = (colorCycle.currentIndex + 1) % colorCycle.colors.length;
          colorCycle.nextIndex = (colorCycle.nextIndex + 1) % colorCycle.colors.length;
        }

        // Interpolate between colors
        const currentColor = colorCycle.colors[colorCycle.currentIndex];
        const nextColor = colorCycle.colors[colorCycle.nextIndex];
        const interpolatedColor = new THREE.Color();
        interpolatedColor.lerpColors(currentColor, nextColor, colorCycle.progress);

        // Apply color to both base color and emissive
        textMaterial.color.copy(interpolatedColor);
        textMaterial.emissive.copy(interpolatedColor).multiplyScalar(0.5); // Softer glow

        renderer.render(scene, camera);
      }
      animate(0);
    });

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      groundGeometry.dispose();
      groundMaterial.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%", 
        height: "100vh",
        cursor: "grab",
      }} 
    />
  );
}
