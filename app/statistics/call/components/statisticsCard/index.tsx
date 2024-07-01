import React, { FC } from "react";
import Card from "./components/card";
import { StatsWrapper } from "./style";
import { Spin } from "antd";
import { IFetchList } from "types";
import {
  ECallType,
  ICallStatistics,
  IStatisticsTotal,
} from "types/statistics/call";
import { CallFrameSvg, InCallSvg, OutCallSvg } from "components";

export interface IStat {
  isLoading: boolean;
  data: IFetchList<ICallStatistics, IStatisticsTotal[]> | undefined;
}
const StatisticsCard: FC<IStat> = ({ isLoading, data }) => {
  const inbound = data?.totals?.find((t) => t.direction == ECallType.inbound);
  const outbound = data?.totals?.find((t) => t.direction == ECallType.outbound);

  const today_inbound =
    data?.today?.find(
      (t: { direction: ECallType }) => t.direction == ECallType.inbound,
    )?.count || 0;

  const today_outbound =
    data?.today?.find(
      (t: { direction: ECallType }) => t.direction == ECallType.outbound,
    )?.count || 0;

  const inbound_total = +(inbound?.count || 0);
  const outbound_total = +(outbound?.count || 0);

  const allTotal = +inbound_total + +outbound_total;
  const allToday = +today_inbound + +today_outbound;

  return (
    <Spin spinning={isLoading}>
      <StatsWrapper>
        <Card
          svg={<CallFrameSvg />}
          color="primary"
          total_count={allTotal}
          today_count={allToday}
        />
        <Card
          svg={<InCallSvg />}
          color="orange"
          total_count={inbound_total}
          today_count={today_inbound}
          label="Incall"
        />
        <Card
          svg={<OutCallSvg />}
          color="deep"
          total_count={outbound_total}
          today_count={today_outbound}
          label="Outcall"
        />
      </StatsWrapper>
    </Spin>
  );
};

export default StatisticsCard;
