import React, { FC } from "react";
import { ArrowRight, GroupSvg, ThroughSvg } from "components";
import { bgColors } from "styles/theme";

interface IProps {
  today?: string;
  registered_today?: string;
  month?: string;
  registered_month?: string;
}

const LeadsCard: FC<IProps> = ({
  today,
  month,
  registered_today,
  registered_month,
}) => {
  return (
    <>
      <div className="head-card">
        <p className="title-card">Leads</p>
        <ThroughSvg />
      </div>
      <div className="foot-card">
        <div className="nums">
          <p className="grotesk">+{today}</p>
          <ArrowRight
            height={20}
            width={20}
            color={bgColors.transparentGreen}
          />
          <p className="grotesk">{registered_today}</p>
        </div>
        <p className="monthly">
          <span>Current month</span>
          &nbsp;
          <span className="grotesk">{month}</span>
          <ArrowRight
            height={14}
            width={14}
            color={bgColors.transparentGreen}
          />
          <span className="grotesk">{registered_month}</span>
        </p>
      </div>
      <div className="icon">
        <GroupSvg color={bgColors.transparentGreen} height={80} width={80} />
      </div>
    </>
  );
};

export default LeadsCard;
