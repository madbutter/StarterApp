"use client";

import { useEffect, useState, ReactNode } from "react";

export default function NoSSR({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
} 