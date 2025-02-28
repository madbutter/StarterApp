"use client";

import store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <React.Fragment>
      <Provider store={store}>{children}</Provider>
    </React.Fragment>
  );
}
