import React from "react";
import Providers from "../Providers/providers";
import { Box } from "lucide-react";

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
