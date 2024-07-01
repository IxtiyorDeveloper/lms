import React from "react";
import { FilterWrapper, Wrapper } from "./style";
import FilterComponent from "./components/filter";
import MiddleSide from "./components/middle";
import Table from "./components/table";
import { usePotentialFailRequest } from "hooks";
import { expand } from "./expand";
import { useRouter } from "next/router";
import { Spin } from "antd";
import PotentialFailRequestModal from "globals/components/potentialFailRequest";
import DeletePotentialFailRequest from "globals/components/deletePotentialFailRequest";

const SingleReport = () => {
  const router = useRouter();
  const { query } = router;
  const id = router.query?.id;

  const { data, isLoading } = usePotentialFailRequest({
    query_params: {
      expand,
      id,
      ...query,
    },
  });

  return (
    <Wrapper>
      <PotentialFailRequestModal />
      <DeletePotentialFailRequest />
      <Spin spinning={isLoading}>
        <FilterWrapper>
          <FilterComponent />
        </FilterWrapper>
        <MiddleSide data={data} />
        <Table data={data} />
      </Spin>
    </Wrapper>
  );
};

export default SingleReport;
