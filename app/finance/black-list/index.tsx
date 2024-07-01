import React from "react";
import { Filter, GroupsData } from "./components";
import { RedBadgeTitle } from "components";
import { useRouter } from "next/router";
import { useBlackList } from "hooks";
import { Wrapper } from "./style";

const BlackList = () => {
  const router = useRouter();

  const {
    data,
    isInitialLoading: isLoading,
    isPreviousData,
  } = useBlackList({
    query_params: {
      branch_id: router?.query?.branch_id,
      day_id: router?.query?.day_id,
      teacherIds: router?.query?.teacherIds,
    },
  });

  return (
    <Wrapper>
      <Filter />
      <div className="badge">
        <RedBadgeTitle title="Black list" count={data?.length} />
      </div>
      <GroupsData data={data} isLoading={isLoading || isPreviousData} />
    </Wrapper>
  );
};

export default BlackList;
