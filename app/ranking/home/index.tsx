import React, { useMemo } from "react";
import { Wrapper } from "./style";
import Filters from "./components/filters";
import TopTeachers from "./components/topTeachers";
import SearchAndTab from "./components/searchAndTab";
import RankingTable from "./components/table";
import { useTeacherRanking } from "hooks/useAcademicControl";
import { useRouter } from "next/router";
import moment from "moment";
import { Spin } from "antd";
import Avg from "./components/avg";
import { sumBy } from "lodash";
import { teacherClassValues } from "./components/table/components/tabs";
import { useMentorRankingConfig } from "hooks";
import FilterMain from "./components/filterMain";

const Ranking = () => {
  const router = useRouter();

  const { data: config, isLoading: loading } = useMentorRankingConfig({
    query_params: {
      year: router.query.year || moment().format("YYYY"),
      month: router.query.month || moment().format("M"),
    },
  });

  const { isLoading, data } = useTeacherRanking({
    query_params: {
      ...router.query,
      year: router.query.year || moment().format("YYYY"),
      month: router.query.month || moment().format("M"),
      type: router.query.type || "100",
      expand: "mentor.userProfile.avatar,countObservations",
      class: undefined,
      branch_id:
        router.query.branch_id == "-1" ? undefined : router.query.branch_id,
      group_count: undefined,
      status: router.query.status ? 450 : undefined,
    },
    keepPreviousData: true,
    // sort: router.query.type != "200" && !router.query.sort,
    sort: true,
    // enabled: !!config?.teacher?.min_group_count,
  });

  const counts = useMemo(() => {
    return {
      [teacherClassValues.a]: sumBy(data?.data, (e) =>
        e.class == +teacherClassValues.a ? 1 : 0
      ),
      [teacherClassValues.b]: sumBy(data?.data, (e) =>
        e.class == +teacherClassValues.b ? 1 : 0
      ),
      [teacherClassValues.c]: sumBy(data?.data, (e) =>
        e.class == +teacherClassValues.c ? 1 : 0
      ),
    };
  }, [data]);

  return (
    <Spin spinning={isLoading}>
      <Wrapper mt={0}>
        <Filters />
        <TopTeachers
          data={[data?.data?.[1], data?.data?.[0], data?.data?.[2]]}
        />
      </Wrapper>
      <Wrapper mt={10}>
        <FilterMain
          loading={loading}
          count={
            (router.query.type === "200"
              ? config?.support?.min_group_count_for_progress
              : config?.teacher?.min_group_count_for_progress) || 0
          }
          config={config}
        />
      </Wrapper>
      <Wrapper mt={10}>
        {/*<div className="divider" />*/}
        <SearchAndTab
          loading={loading}
          count={
            (router.query.type === "200"
              ? config?.support?.min_group_count_for_progress
              : config?.teacher?.min_group_count_for_progress) || 0
          }
          config={config}
        />
        <Avg avg={data?.avg} count={data?.data?.length} />
      </Wrapper>
      <Wrapper style={{ background: "transparent", padding: 0 }} mt={30}>
        <RankingTable data={data?.data} counts={counts} />
      </Wrapper>
    </Spin>
  );
};

export default Ranking;
