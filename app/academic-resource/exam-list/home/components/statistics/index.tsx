import React, { FC } from "react";
import { Wrapper } from "./style";
import Chart, { ChartTabKey } from "./components/chart";
import { useAverageTeacher, useExamProgress, usePassRateTeacher } from "hooks";
import { useRouter } from "next/router";
import { Spin } from "antd";
import moment from "moment";

interface IProps {
  action?: string;
}
const Statistics: FC<IProps> = ({ action }) => {
  const router = useRouter();
  const statistic_key = router.query?.statistic_key ?? ChartTabKey.PROGRESS;
  const level = !!router.query?.stats_level_id
    ? (router.query?.stats_level_id ?? "").toString()?.split(",")
    : null;
  const date = moment(
    router.query?.date || moment().format("YYYY-MM"),
    "YYYY-MM"
  );

  const { data: examProgress, isLoading: isProgressLoading } = useExamProgress({
    query_params: {
      ...router.query,
      month: date.format("MM"),
      year: date.format("YYYY"),
      sub_level_id: level,
      roundedTabIndex: undefined,
      tabId: undefined,
      statistic_key: undefined,
    },
    enabled: statistic_key == ChartTabKey.PROGRESS,
  });

  const { data: statisticsPassRate, isLoading: isStatisticsPassRateLoading } =
    usePassRateTeacher({
      query_params: {
        ...router.query,
        month: date.format("MM"),
        year: date.format("YYYY"),
        sub_level_id: level,
        roundedTabIndex: undefined,
        tabId: undefined,
        statistic_key: undefined,
      },
      enabled: statistic_key == ChartTabKey.PASS_RATE,
    });

  const { data: statisticsAverage, isLoading: isStatisticsAverageLoading } =
    useAverageTeacher({
      query_params: {
        ...router.query,
        month: date.format("MM"),
        year: date.format("YYYY"),
        sub_level_id: level,
        roundedTabIndex: undefined,
        tabId: undefined,
        statistic_key: undefined,
      },
      enabled: statistic_key == ChartTabKey.AVERAGE,
    });

  return (
    <Wrapper>
      <Spin
        spinning={
          statistic_key == ChartTabKey.PROGRESS
            ? isProgressLoading
            : statistic_key == ChartTabKey.PASS_RATE
              ? isStatisticsPassRateLoading
              : isStatisticsAverageLoading
        }>
        <Chart
          examProgress={examProgress}
          statisticsAverage={statisticsAverage}
          statisticsPassRate={statisticsPassRate}
        />
      </Spin>
    </Wrapper>
  );
};

export default Statistics;
