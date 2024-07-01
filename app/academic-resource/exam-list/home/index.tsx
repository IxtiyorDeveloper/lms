import React, { Fragment } from "react";
import { Wrapper } from "./style";
import { Filter, MonthFilter, Table } from "./components";
import { useAdminMockStats, useExamCounts, useExamPageData } from "hooks";
import moment from "moment/moment";
import { useRouter } from "next/router";
import Overall from "./components/overall";
import Statistics from "./components/statistics";
import FilterMockComponent from "./components/filterMock";
import StatisticsMock from "./components/statisticsMock";
import OverallMock from "./components/overallMock";
import TableSideMock from "./components/tableSideMock";
import { ExamTabOptions } from "./components/monthFilter";

const ExamList = () => {
  const router = useRouter();

  const date = moment(
    router.query?.date || moment().format("YYYY-MM"),
    "YYYY-MM"
  );
  const level = !!router.query?.stats_level_id
    ? (router.query?.stats_level_id ?? "").toString()?.split(",")
    : null;

  const { data: counts, isLoading } = useExamCounts({
    ...router.query,
    month: date.format("MM"),
    year: date.format("YYYY"),
    stats_level_id: level,
    roundedTabIndex: undefined,
    tabId: undefined,
    statistic_key: undefined,
    expand: "students, average, attendance, levels",
  });

  const { data: mockCounts, isLoading: mockIsLoading } = useAdminMockStats({
    query_params: {
      ...router.query,
      month: date.format("MM"),
      year: date.format("YYYY"),
      sub_level_id: level,
      roundedTabIndex: undefined,
      tabId: undefined,
      statistic_key: undefined,
      [`per-page`]: router.query.pageSize || 50,
      expand: "students, avg_score, average, levels",
    },
    enabled: router.query?.tabId == ExamTabOptions.MOCK,
  });

  const { data } = useExamPageData({
    query_params: {
      expand: "groups,teachers,supports,supervisors",
      month: date.format("MM"),
      year: date.format("YYYY"),
    },
  });

  return (
    <Wrapper>
      <MonthFilter />
      {!router.query?.tabId || router.query?.tabId == ExamTabOptions.REAL ? (
        <Fragment>
          <Filter data={data} />
          <Statistics />
          <Overall counts={counts} isLoading={isLoading} />
          <Table counts={counts} />
        </Fragment>
      ) : router.query?.tabId == ExamTabOptions.MOCK ? (
        <Fragment>
          <FilterMockComponent data={data} />
          <StatisticsMock />
          <OverallMock counts={mockCounts} isLoading={mockIsLoading} />
          <TableSideMock counts={mockCounts} />
        </Fragment>
      ) : null}
    </Wrapper>
  );
};

export default ExamList;
