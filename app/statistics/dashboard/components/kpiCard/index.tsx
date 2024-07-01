import React, { FC } from "react";
import { ThroughSvg } from "components";
import { bgColors, textColors } from "styles/theme";
import { Wrapper } from "./style";
import Link from "next/link";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import {
  BackgroundTwoCircleSvg,
  CardsSvg,
  KpiCardSvg,
} from "@jasurbekyuldashov/lms-web-icons";

interface IProps {
  period?: number;
  today?: number;
}

const KPICard: FC<IProps> = ({ period = 0, today = 0 }) => {
  return (
    <Wrapper>
      <Link href="/statistics/dashboard/kpi">
        <div className="head-card" style={{ color: textColors.sceptreBlue }}>
          <p className="title-card">KPI</p>
          <ThroughSvg color={bgColors.white} />
        </div>
      </Link>
      <p className="grotesk kpi textFont">
        {toCurrencyFormat(+period)}{" "}
        <sup className="green grotesk textFont">{toCurrencyFormat(+today)}</sup>
      </p>
      <div className="icon">
        <KpiCardSvg />
      </div>
      <div className="bg-img-left">
        <CardsSvg />
      </div>
      <div className="bg-img-right">
        <BackgroundTwoCircleSvg color="#1D8DA7" />
      </div>
      {/*<RulerChart max={40000000} percent={39} />*/}
    </Wrapper>
  );
};

export default KPICard;
