import React from "react";
import { Wrapper } from "./style";
import Chart from "./components/chart";
import { useGroupStatistics } from "hooks";
import { useRouter } from "next/router";
import { Spin } from "antd";
import moment from "moment";

const Statistics = () => {
  const router = useRouter();
  const {
    page,
    tab_id,
    with_tabs,
    branches,
    full_group,
    pageSize,
    monthM,
    yearM,
    statistics_tab,
    ...queries
  } = router.query;

  const { data: statistics, isLoading: isStatisticsLoading } =
    useGroupStatistics({
      query_params: {
        year: yearM || moment().format("YYYY"),
        month: monthM || moment().format("MM"),
        type: "byStudentCount",
        branches: Array.isArray(branches)
          ? branches
          : Number(branches)
            ? [Number(branches)]
            : null,
        levelIds: router.query?.subLevelIds,
        full_group: full_group !== "true",
        state: statistics_tab === "all" ? null : statistics_tab || "100",
      },
    });

  return (
    <Wrapper>
      <Spin spinning={isStatisticsLoading}>
        <Chart
          statistics={statistics?.byStudentCount?.map((obj) => ({
            ...obj,
            num_students:
              obj.num_students == 0 ? 0 : Number(obj.num_students) || null,
          }))}
        />
      </Spin>
    </Wrapper>
  );
};

export default Statistics;
