import React from "react";
import HeadTable from "./headTable";
import { Wrapper } from "./style";
import TableComponent from "./table";
import { useReferralIndex } from "hooks";
import {
  REFERRAL_APPROVED,
  REFERRAL_CONTACTING,
  REFERRAL_SPENT,
} from "constants/referral";
import { useRouter } from "next/router";

const TableSide = () => {
  const router = useRouter();

  const { page, pageSize } = router.query;

  const { data, isLoading } = useReferralIndex({
    query_params: {
      status:
        Number(router.query?.type) === REFERRAL_APPROVED
          ? [REFERRAL_APPROVED, REFERRAL_SPENT]
          : router.query?.type || REFERRAL_CONTACTING,
      from_date: router.query?.from_date,
      page,
      "per-page": pageSize,
      to_date: router.query?.to_date,
      search: router.query?.search,
      referred_by: router.query?.referred_by,
    },
  });

  return (
    <Wrapper>
      <HeadTable data={data?.tabs} isLoading={isLoading} />
      <TableComponent data={data} isLoading={isLoading} />
    </Wrapper>
  );
};

export default TableSide;
