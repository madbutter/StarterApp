"use client";

import React from "react";
import Providers from "../Providers/providers";

const AppContainer = ({ children }: any) => {
  return (
    <React.Fragment>
      <Providers>
        <>{children}</>
      </Providers>
    </React.Fragment>
  );
};

export default AppContainer;
