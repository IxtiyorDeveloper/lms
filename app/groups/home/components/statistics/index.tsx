import React from "react";
import { Wrapper } from "./style";
import Chart from "./components/chart";
import { useGroupStatisticsStudentsCount } from "hooks";
import { useRouter } from "next/router";
import { Spin } from "antd";

const Statistics = () => {
  const router = useRouter();
  const {
    page,
    tab_id,
    with_tabs,
    full_group,
    pageSize,
    statistics_tab,
    ...queries
  } = router.query;

  const { data: statistics, isLoading: isStatisticsLoading } =
    useGroupStatisticsStudentsCount({
      query_params: {
        page: page || 1,
        pageSize: pageSize || 20,
      },
      body: {
        ...queries,
        tab_id: tab_id || 100,
        statistics_tab:
          statistics_tab === "all" ? null : statistics_tab || "100",
        full_group: full_group !== "true",
        with_tabs: with_tabs || 1,
        enabled: true,
        teacherType: undefined,
      },
    });

  return (
    <Wrapper>
      <Spin spinning={isStatisticsLoading}>
        <Chart statistics={statistics} />
      </Spin>
    </Wrapper>
  );
};

export default Statistics;
