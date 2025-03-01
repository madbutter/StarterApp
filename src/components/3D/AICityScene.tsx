"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Create a client-only version of the 3D scene
const Scene = dynamic(() => import("./Scene"), { ssr: false });

const AICityScene = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            Loading 3D scene...
          </div>
        }
      >
        <Scene />
      </Suspense>
    </div>
  );
};

export default AICityScene;
