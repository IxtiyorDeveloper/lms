import React from "react";
import { Wrapper } from "./style";
import { Progress } from "antd";
import { bgColors } from "styles/theme";

export interface Interface {
  capacity: {
    sumFreePlace: number;
    totalPlace: number;
    filled: number;
    percentage: number;
  };
}

const Capacity = ({ capacity }: Interface) => {
  return (
    <Wrapper>
      <div className="top">
        <p className="left">Branch capacity</p>
        <p className="right">{capacity?.percentage}%</p>
      </div>
      <div className="pr">
        <Progress
          percent={capacity?.percentage}
          strokeColor={bgColors.midori}
          showInfo={false}
        />
      </div>
      <div className="bottom">
        <p className="left">{capacity?.sumFreePlace} free place</p>
        <p className="right">
          {capacity?.filled} of {capacity?.totalPlace}
        </p>
      </div>
    </Wrapper>
  );
};

export default Capacity;
