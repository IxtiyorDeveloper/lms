import React, { useMemo, useState } from "react";
import { Collapse, CollapseProps } from "antd";
import { Wrapper, LastLabel, MainTitle, Circle } from "./style";
import BarChartV2 from "app/academic-resource/red-list/components/barchartV2";
import { ITabs } from "./type";
import { ChevronDownSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";

const Chart = ({ data }: ITabs) => {
  const statisticsData = data?.statistics;

  const chartData = useMemo(
    () =>
      (statisticsData || [])
        .sort((a, b) => (b?.freshman_count || 0) - (a?.freshman_count || 0))
        ?.map((e) => {
          return {
            time: `${e?.userProfile?.firstname}`,
            lost: +(e?.freshman_count || 0),
            avatar: e.userProfile?.avatar,
            phone: "",
          };
        }),
    [statisticsData]
  );
  const genExtra = () => <LastLabel>Collapse</LastLabel>;

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <MainTitle>Statistics</MainTitle>,
      children: (
        <div>
          <BarChartV2
            withLabel
            data={chartData}
            chartBg={`linear-gradient(to bottom, #42BD6E 0%, #7AE7A1 100%)`}
          />
        </div>
      ),
      extra: genExtra(),
    },
  ];
  return (
    <Wrapper>
      <Collapse
        items={items}
        expandIconPosition="end"
        bordered={false}
        ghost
        expandIcon={({ isActive }) => (
          <Circle active={!!isActive}>
            <ChevronDownSvg color={bgColors.black} width={18} height={18} />
          </Circle>
        )}
      />
    </Wrapper>
  );
};

export default Chart;
