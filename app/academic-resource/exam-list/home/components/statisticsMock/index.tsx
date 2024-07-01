import React, { FC } from "react";
import { Wrapper } from "./style";
import Chart, { ChartTabKey } from "./components/chart";
import {
  useMockAverageTeacher,
  useMockExamDataTeacher,
  useMockPassRateTeacher,
} from "hooks";
import { useRouter } from "next/router";
import { Spin } from "antd";
import moment from "moment";
import { ExamTabOptions } from "../monthFilter";

interface IProps {
  action?: string;
}
const StatisticsMock: FC<IProps> = ({ action }) => {
  const router = useRouter();
  const statistic_key = router.query?.statistic_key ?? ChartTabKey.PASS_RATE;
  const isMock = router.query?.tabId === ExamTabOptions.MOCK;

  const date = moment(
    router.query?.date || moment().format("YYYY-MM"),
    "YYYY-MM"
  );
  const level = !!router.query?.stats_level_id
    ? (router.query?.stats_level_id ?? "").toString()?.split(",")
    : null;

  const { data: statisticsPassRate, isLoading: isStatisticsPassRateLoading } =
    useMockPassRateTeacher({
      query_params: {
        ...router.query,
        month: date.format("MM"),
        year: date.format("YYYY"),
        sub_level_id: level,
        roundedTabIndex: undefined,
        tabId: undefined,
        statistic_key: undefined,
      },
      enabled: statistic_key == ChartTabKey.PASS_RATE && isMock,
    });

  const { data: statisticsAverage, isLoading: isStatisticsAverageLoading } =
    useMockAverageTeacher({
      action,
      query_params: {
        ...router.query,
        month: date.format("MM"),
        year: date.format("YYYY"),
        sub_level_id: level,
        roundedTabIndex: undefined,
        tabId: undefined,
        statistic_key: undefined,
      },
      enabled: statistic_key == ChartTabKey.AVERAGE && isMock,
    });

  return (
    <Wrapper>
      <Spin
        spinning={
          statistic_key == ChartTabKey.PASS_RATE
            ? isStatisticsPassRateLoading
            : isStatisticsAverageLoading
        }>
        <Chart
          statisticsPassRate={statisticsPassRate}
          statisticsAverage={statisticsAverage}
        />
      </Spin>
    </Wrapper>
  );
};

export default StatisticsMock;
