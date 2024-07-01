import React from "react";
import { Card, CardsWrapper, FormatWrapper, Title, Wrapper } from "./style";
import { Segmented } from "components";
import GenerateMenu from "../../statistics/components/chart/menu";
import { useRouter } from "next/router";
import { bgColors } from "styles/theme";
import { Progress, Spin } from "antd";
import { useGroupStatistics } from "hooks";
import moment from "moment";

const ByAverageAmount = () => {
  const router = useRouter();

  const month = router.query.monthM || moment().format("MM");
  const year = router.query.yearM || moment().format("YYYY");
  const averageTabStatus = Array.isArray(router.query?.average_tab)
    ? router.query?.average_tab?.map((n) => +n)
    : Number(router.query?.average_tab) || null;
  const branches = Array.isArray(router.query.branches)
    ? router.query.branches.map((l) => +l)
    : !!router.query.branches
      ? [Number(router.query.branches)]
      : null;

  const { data, isLoading } = useGroupStatistics({
    query_params: {
      year: year,
      type: "byAverageAmountOfStudent",
      month: month,
      branches: branches,
      state: averageTabStatus,
    },
  });

  const { average_tab } = router.query;

  const dataA = [
    {
      max_count: 0,
      actual_count: 0,
      label: "Label",
    },
    {
      max_count: 0,
      actual_count: 0,
      label: "Label",
    },
    {
      max_count: 0,
      actual_count: 0,
      label: "Label",
    },
    {
      max_count: 0,
      actual_count: 0,
      label: "Label",
    },
  ];

  return (
    <Wrapper>
      <Segmented
        tabPlace="right"
        action={<Title>Average amount of students in groups</Title>}
        // @ts-ignore
        options={GenerateMenu({ statistics_tab: average_tab })}
        initValue="all"
        routerKey="average_tab"
      />
      <CardsWrapper>
        {(data?.byAverageAmountOfStudent.length
          ? data?.byAverageAmountOfStudent
          : dataA
        )?.map((obj, index) => {
          const average = (obj.actual_count * 100) / Number(obj.max_count);

          return (
            <Card key={index}>
              <Progress
                type="circle"
                size={[150, 150]}
                strokeColor={bgColors.midori}
                strokeWidth={12}
                strokeLinecap="butt"
                percent={average}
                format={() => (
                  <FormatWrapper>
                    <p className="mb-a">{obj.label}</p>
                    <p className="nums">
                      {obj.actual_count}/{obj.max_count}
                    </p>
                  </FormatWrapper>
                )}
              />
            </Card>
          );
        })}
      </CardsWrapper>
    </Wrapper>
  );
};

export default ByAverageAmount;
