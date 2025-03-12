"use client";

import NoSSR from "./NoSSR";
import Scene from "./LogoScene";

export default function LogoAnimation() {
  return (
    <NoSSR>
      <Scene />
    </NoSSR>
  );
}

// Move the 3D scene to a separate file to be dynamically imported
// Create a new file LogoScene.tsx with the following content 