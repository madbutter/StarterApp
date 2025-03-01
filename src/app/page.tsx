"use client";

import React from "react";
import dynamic from "next/dynamic";
import GeneralLayout from "@/layouts/GeneralLayout";

// Dynamically import the 3D component with SSR disabled
const AICityScene = dynamic(() => import("@/components/3D/AICityScene"), {
  ssr: false,
  loading: () => <div>Loading 3D scene...</div>,
});

const Home: React.FC = () => {
  return (
    <GeneralLayout>
      <AICityScene />
    </GeneralLayout>
  );
};

export default Home;
