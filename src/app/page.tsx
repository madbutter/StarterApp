"use client";

import React from "react";
import GeneralLayout from "@/layouts/GeneralLayout";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/3D/Scene"), {
  ssr: false,
  loading: () => <div className="w-full h-screen flex items-center justify-center">Loading 3D scene...</div>,
});

export default function Home() {
  return (
    <GeneralLayout>
      <Scene />
    </GeneralLayout>
  );
}
