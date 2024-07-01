import { Segmented } from "components";
import React from "react";
import { TabHeader, TabWrapper } from "./style";
import { RewardStatus } from "constants/staff";
import { useRouter } from "next/router";

const RewardsPageTab = ({
  data,
  loading,
}: {
  data: {
    count: string;
    label: string;
    value: RewardStatus;
  }[];
  loading: boolean;
}) => {
  const router = useRouter();
  const { status: sts } = router.query;
  const status = !!sts ? Number(sts) : RewardStatus.PENDING;

  const pending = data?.find((item) => item.value === RewardStatus.PENDING);
  const given = data?.find((item) => item.value === RewardStatus.GIVEN);
  const rejected = data?.find((item) => item.value === RewardStatus.REJECTED);
  const approved = data?.find((item) => item.value === RewardStatus.APPROVED);

  const options = [
    {
      value: `${RewardStatus.PENDING}`,
      label: <TabHeader>Pending ({pending?.count})</TabHeader>,
    },
    {
      value: `${RewardStatus.APPROVED}`,
      label: <TabHeader>Approved ({approved?.count})</TabHeader>,
    },
    {
      value: `${RewardStatus.GIVEN}`,
      label: <TabHeader>Given rewards ({given?.count})</TabHeader>,
    },
    {
      value: `${RewardStatus.REJECTED}`,
      label: <TabHeader>Rejected rewards ({rejected?.count})</TabHeader>,
    },
  ];

  return (
    <TabWrapper>
      <Segmented
        block
        options={options}
        routerKey="status"
        initValue={status}
      />
    </TabWrapper>
  );
};

export default RewardsPageTab;
