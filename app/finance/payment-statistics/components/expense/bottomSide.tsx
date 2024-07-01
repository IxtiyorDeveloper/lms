import React from "react";
import { BottomWrapper } from "./style";
import SecondChart from "./secondChart";

const counts = [57, 33, 10];

const BottomSide = () => {
  return (
    <BottomWrapper>
      <SecondChart counts={counts} countVisibility />
    </BottomWrapper>
  );
};

export default BottomSide;
