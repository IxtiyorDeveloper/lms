import React, { useMemo } from "react";
import { Collapse, CollapseProps, Flex } from "antd";
import { Wrapper, MainTitle, Circle } from "./style";
import BarChartV2 from "app/academic-resource/red-list/components/barchartV2";
import { ITabs } from "./type";
import { ChevronDownSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import CountCard from "../countCard";
import { LeadTabEnums } from "constants/leadTabs";

const Chart = ({ data }: ITabs) => {
  const statisticsData = data;

  const chartData = useMemo(
    () =>
      (statisticsData?.users || []).map((e: any) => {
        return {
          time: `${e?.userProfile?.firstname}`,
          lost: +(e?.lead_register_count || 0),
          avatar: e.userProfile?.avatar,
          phone: "",
        };
      }),
    [statisticsData],
  );

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <MainTitle>
          <h4>Statistics</h4>
        </MainTitle>
      ),
      children: (
        <div>
          <Flex
            gap={20}
            style={{
              margin: "8px 0 20px",
            }}
          >
            <CountCard
              today={data?.new_leads?.today ?? 0}
              this_month={data?.new_leads?.this_month ?? 0}
              type={LeadTabEnums.NEW_LEADS}
            />
            <CountCard
              today={data?.registered_leads?.today ?? 0}
              this_month={data?.registered_leads?.this_month ?? 0}
              type={LeadTabEnums.REGISTERED_LEADS}
            />
          </Flex>
          <BarChartV2
            withLabel
            data={chartData}
            chartBg={`linear-gradient(to bottom, #42BD6E 0%, #7AE7A1 100%)`}
          />
        </div>
      ),
    },
  ];

  return (
    <Wrapper>
      <Collapse
        items={items}
        expandIconPosition="start"
        bordered={false}
        ghost
        accordion={false}
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
