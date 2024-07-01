import React from "react";
import { Wrapper } from "./style";
import { Segmented, SelectMonth, SelectYear } from "components";
import DoubleChart from "../doubleTransactionChart";
import { useStudentBalanceTransactions } from "hooks";
import { getByMonthAdapter } from "./utils";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { handleNavigateYear } from "utils/handleNavigateYear";
import moment from "moment";
import { handleNavigateMonth } from "utils/handleNavigateMonth";

const TransactionsTab = () => {
  const router = useRouter();

  const { data, isLoading } = useStudentBalanceTransactions({
    query_params: {
      year: router.query?.year || moment().format("YYYY"),
      month: router.query?.month || moment().format("MM"),
      tab: router.query?.transactionsTab || "100",
    },
  });

  const menu = [
    {
      label: "By month",
      value: "100",
      children: (
        <DoubleChart
          data={getByMonthAdapter(data || [], "month")}
          name1="income_balance"
          name2="outcome_balance"
          xAxisName="month"
        />
      ),
    },
    {
      label: "By day",
      value: "200",
      children: (
        <Spin spinning={isLoading}>
          <DoubleChart
            data={getByMonthAdapter(data || [], "day")}
            name1="income_balance"
            name2="outcome_balance"
            xAxisName="day"
          />
        </Spin>
      ),
    },
  ];

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <Segmented
          routerKey="transactionsTab"
          options={menu}
          initValue="100"
          action={
            (router.query?.transactionsTab || "100") === "100" ? (
              <SelectYear
                onChange={(e) => {
                  setTimeout(() => {
                    handleNavigateYear({ e, router, queryKey: ["year"] });
                  }, 300);
                }}
              />
            ) : (
              <SelectMonth
                onChange={(e) =>
                  setTimeout(
                    () =>
                      handleNavigateMonth({
                        e,
                        router,
                        queryKey: ["year", "month"],
                      }),
                    300,
                  )
                }
                initValue={moment(
                  `${router.query.year || moment().year()} ${
                    router.query.month || moment().month() + 1
                  }`,
                  "YYYY MM",
                ).format("MMMM YYYY")}
              />
            )
          }
        />
      </Wrapper>
    </Spin>
  );
};
export default TransactionsTab;
