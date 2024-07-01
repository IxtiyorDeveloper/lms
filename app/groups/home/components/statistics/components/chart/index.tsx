import React, { useEffect } from "react";
import { Collapse, CollapseProps } from "antd";
import {
  Wrapper,
  MainTitle,
  Circle,
  Right,
  Text,
  Label,
  Count,
  ActionWrapper,
  LabelWrapper,
} from "./style";
import { ITabs } from "./type";
import { ChevronDownSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { Segmented, Switch } from "components";
import GenerateMenu from "./menu";
import { useRouter } from "next/router";
import BarChartV2 from "./barchart";
import { generateData } from "./generateData";
import { EGroupTabs } from "constants/groupStatus";
import { useForm } from "react-hook-form";

const Chart = ({ statistics }: ITabs) => {
  const router = useRouter();
  const statistics_tab =
    router.query?.statistics_tab?.toString() || EGroupTabs.Opening;

  const { control, watch } = useForm();

  const ch = generateData({ statistics });

  const chartData = ch?.find(
    (f) => f.tabId == statistics_tab || f.tabId != statistics_tab,
  )?.data;

  const count = chartData?.reduce((acc: any, cur: { num_groups: any }) => {
    return acc + +cur.num_groups;
  }, 0);

  useEffect(() => {
    router.push(
      {
        query: {
          ...router.query,
          full_group: Boolean(watch("full_group")),
        },
      },
      undefined,
      { scroll: false },
    );
  }, [watch("full_group")]);

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <MainTitle>
          <Text>Statistics</Text>
          <Right>
            <Count className="grotesk">{count}</Count>
            <Label>Groups</Label>
          </Right>
        </MainTitle>
      ),
      children: (
        <div style={{ height: "400px" }}>
          <Segmented
            action={
              <ActionWrapper>
                <LabelWrapper>Full+</LabelWrapper>
                <Switch control={control} name="full_group" />
                <LabelWrapper>Count</LabelWrapper>
              </ActionWrapper>
            }
            options={GenerateMenu({ statistics_tab })}
            initValue={statistics_tab}
            routerKey="statistics_tab"
          />
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
