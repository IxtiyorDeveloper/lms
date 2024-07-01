import React from "react";
import { Wrapper } from "./style";

const HalfBorder = ({ children }: any) => {
  return (
    <Wrapper>
      <div className="container">
        <div className="years">{children}</div>
      </div>
    </Wrapper>
  );
};

export default HalfBorder;
