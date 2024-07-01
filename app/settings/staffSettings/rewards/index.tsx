import { useGetRewards } from "hooks";
import React from "react";
import RewardsPageTab from "./components/tab";
import { Wrapper } from "../style";
import { useRouter } from "next/router";
import Table from "./components/table";
import { RewardStatus } from "constants/staff";

const Rewards = () => {
  const router = useRouter();
  const { page, pageSize, status } = router.query;

  const { data, isLoading } = useGetRewards({
    query_params: {
      page,
      pageSize,
      status: status ?? RewardStatus.PENDING,
    },
  });

  return (
    <Wrapper>
      <RewardsPageTab data={data?.tabs as any} loading={isLoading} />
      <Table data={data} loading={isLoading} />
    </Wrapper>
  );
};

export default Rewards;
