import React, { useEffect } from "react";
import { Wrapper, ActionWrapper, LabelWrapper, ActionWrap } from "./style";
import { ITabs } from "./type";
import { MySelect, Segmented, Switch } from "components";
import GenerateMenu from "./menu";
import { useRouter } from "next/router";
import BarChartV2 from "./barchart";
import { generateData } from "./generateData";
import { EGroupTabs } from "constants/groupStatus";
import { useForm } from "react-hook-form";
import { usePageDataMemo } from "hooks";

const Chart = ({ statistics }: ITabs) => {
  const router = useRouter();

  const selects = usePageDataMemo();

  const statistics_tab =
    router.query?.statistics_tab?.toString() || EGroupTabs.Opening;

  const { control, setValue, watch } = useForm();

  const ch = generateData({ statistics });

  const chartData = ch?.find(
    (f) => f.tabId == statistics_tab || f.tabId != statistics_tab,
  )?.data;

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

  useEffect(() => {
    setValue(
      "subLevelIds",
      selects?.flatLevels?.map((l) => l.value),
    );
  }, []);

  return (
    <Wrapper>
      <div style={{ height: "400px" }}>
        <Segmented
          action={
            <ActionWrap>
              <ActionWrapper>
                <LabelWrapper>Full+</LabelWrapper>
                <Switch control={control} name="full_group" />
                <LabelWrapper>Count</LabelWrapper>
              </ActionWrapper>
              <div style={{ width: "300px" }}>
                <MySelect
                  name="subLevelIds"
                  options={selects.flatLevels}
                  control={control}
                  onChange={(e) => {
                    setValue("subLevelIds", e);
                    router.push({
                      query: {
                        ...router.query,
                        subLevelIds: e,
                      },
                    });
                  }}
                  maxTagCount={1}
                  mode="multiple"
                />
              </div>
            </ActionWrap>
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
    </Wrapper>
  );
};

export default Chart;
