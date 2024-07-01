import React from "react";
import { ChildrenWrapper, TitleWrapper, Wrapper } from "./style";
import { RoundedTab } from "components";
import BalanceIn from "./balanceIn";
import { useStudentBalanceTransactionsList } from "hooks";
import BalanceOut from "./balanceOut";
import { useRouter } from "next/router";

const TransactionList = () => {
  const router = useRouter();

  const { data, isLoading } = useStudentBalanceTransactionsList({
    query_params: {
      from_date: router.query?.date_from,
      to_date: router.query?.date_to,
      type: router.query?.balanceTransactionType || "100",
      search: router.query?.search,
      page: router.query?.page || 1,
      actions: Array.isArray(router.query?.actions)
        ? router.query?.actions
        : !!router.query?.actions
          ? [router.query?.actions]
          : null,
      "per-page": router.query?.pageSize || 20,
    },
  });

  return (
    <Wrapper>
      <RoundedTab
        tabs={[
          {
            title: () => (
              <TitleWrapper>
                Balance in (
                {data?.total_count.filter((a) => a.type === "200")[0]?.count ||
                  0}
                )
              </TitleWrapper>
            ),
            children: <BalanceIn data={data} isLoading={isLoading} />,
            query: {
              balanceTransactionType: "100",
            },
          },
          {
            title: () => (
              <TitleWrapper>
                Balance out (
                {data?.total_count.filter((a) => a.type === "100")[0]?.count ||
                  0}
                )
              </TitleWrapper>
            ),
            children: <BalanceOut data={data} isLoading={isLoading} />,
            query: {
              balanceTransactionType: "200",
            },
          },
        ]}
      />
    </Wrapper>
  );
};

export default TransactionList;
