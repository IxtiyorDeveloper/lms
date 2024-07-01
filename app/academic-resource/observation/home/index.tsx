import React from "react";
import { Content, Wrapper } from "./style";
import TopCard from "./components/top";
import TableSide from "./components/table";
import CreateObservation from "globals/components/createObservation";
import ChangeObservation from "globals/components/changeObservation";
import { useRouter } from "next/router";
import { ObservationBranch } from "./components/top/type";
import { useObservationStatistics } from "hooks";
import moment from "moment";
import { Spin } from "antd";

const Observation = () => {
  const router = useRouter();
  const currentBranch =
    router.query.branch_id?.toString() ?? ObservationBranch.all;

  const branch_id =
    currentBranch == ObservationBranch.all ? undefined : currentBranch;

  const { data, isLoading } = useObservationStatistics({
    query_params: {
      year: router.query?.year || moment().format("YYYY"),
      month: router.query?.month || moment().format("MM"),
      branch_id,
      search: router.query?.search,
      sort: router.query?.sort,
    },
  });

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <CreateObservation />
        <ChangeObservation />
        <TopCard data={data} currentBranch={currentBranch} />
        <Content>
          <TableSide data={data} />
        </Content>
      </Wrapper>
    </Spin>
  );
};

export default Observation;
