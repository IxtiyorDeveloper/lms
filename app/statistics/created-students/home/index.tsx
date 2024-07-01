import React, { useMemo } from "react";
import { Wrapper, TabsWrapper, StatisticsCollapse } from "./style";
import { Divider } from "@mui/material";
import Table from "./components/table";
import { WaitingListFilterWrapper } from "./components/filter/style";
import Filter from "./components/filter";
import { useRouter } from "next/router";
import { useStatisticsCreateStudent } from "hooks";
import { ETabStatuses } from "types";
import Tabs from "./components/tabs";
import Chart from "./components/chart";
import { expands } from "./expand";

const CreatedStudentList = () => {
  const router = useRouter();
  const query = router.query;

  const tab_id = router.query?.tab_id?.toString() || ETabStatuses.TAB_WAITING;

  const { isLoading, isPreviousData, data } = useStatisticsCreateStudent({
    query_params: {
      tab_id,
      ...query,
      expand: expands[tab_id as keyof typeof expands],
    },
  });

  return (
    <Wrapper>
      <WaitingListFilterWrapper>
        <Filter />
      </WaitingListFilterWrapper>
      <StatisticsCollapse>
        <Chart data={data} />
      </StatisticsCollapse>
      <TabsWrapper>
        <Tabs tab_id={tab_id} data={data} />
      </TabsWrapper>
      <div className="sectionTable">
        <Divider />
        <Table
          data={data}
          isLoading={isLoading}
          isPreviousData={isPreviousData}
        />
      </div>
    </Wrapper>
  );
};

export default CreatedStudentList;
