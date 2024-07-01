import React, { FC } from "react";
import { ArrowRight, ReceptionSvg, ThroughSvg } from "components";
import { bgColors } from "styles/theme";

interface IProps {
  today?: string;
  month?: string;
  registered_today?: string;
  registered_month?: string;
}

const WaitingCard: FC<IProps> = ({
  today,
  month,
  registered_today,
  registered_month,
}) => {
  return (
    <>
      <div
        className="head-card"
        style={{
          paddingBottom: "9px",
          borderBottom: "1px solid #FDEED1",
          backgroundColor: "#FBA454",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <p className="title-card">Waiting list</p>
        <ThroughSvg />
      </div>
      <div className="foot-card">
        <div className="nums">
          <p className="grotesk">+{today || 0}</p>
          <ArrowRight
            height={20}
            width={20}
            color={bgColors.transparentGreen}
          />
          <p className="grotesk">{registered_today || 0}</p>
        </div>
        <p className="monthly">
          <span>Monthly</span>
          &nbsp;
          <span className="grotesk">{month || 0}</span>
          <ArrowRight
            height={14}
            width={14}
            color={bgColors.transparentGreen}
          />
          <span className="grotesk">{registered_month || 0}</span>
        </p>
      </div>
      <div className="icon">
        <ReceptionSvg />
      </div>
    </>
  );
};

export default WaitingCard;
