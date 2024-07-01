import React, { FC } from "react";
import { ThroughSvg } from "components";
import { Wrapper } from "./style";

interface IProps {
  num?: string;
}

const SystemLifecycleCard: FC<IProps> = ({ num }) => {
  return (
    <Wrapper>
      <div className="head-card">
        <p className="title-card">System Lifecycle</p>
        <ThroughSvg />
      </div>
      <div className="cards-wrapper">
        <p className="number">{num}</p>
        <img src="/customer-cycle.png" width="100" alt="cusomer cycle" />
      </div>
    </Wrapper>
  );
};

export default SystemLifecycleCard;
