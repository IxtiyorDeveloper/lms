import React, { FC, useMemo } from "react";
import { AdministrativeSvg, FlowSvg, Segmented } from "components";
import { Spin } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { bgColors } from "styles/theme";
import { Wrapper } from "./style";
import TransactionsTab from "../transactionsTab";
import { useStudentBalanceDashboardByCondition } from "hooks";
import ConditionCharts from "./conditionCharts";

const HeadSide: FC = () => {
  const router = useRouter();
  const { isLoading: isLoadingDashBoard, data: dataDashboard } =
    useStudentBalanceDashboardByCondition({
      query_params: {
        year: router.query.year,
      },
    });

  const selects = useMemo(() => {
    const actual_balances = dataDashboard?.reduce((acc, cer) => {
      return acc + (cer?.actual_balance || 0);
    }, 0);

    const total_balances = dataDashboard?.reduce((acc, cer) => {
      return acc + (cer?.total_balance || 0);
    }, 0);

    const balanceSpent = Number(total_balances) - Number(actual_balances);

    const overallPieChartData = [
      {
        name: "Balance",
        value: total_balances,
        color: bgColors.kitten,
        percent: (((total_balances || 0) * 100) / balanceSpent).toFixed(1),
        gap: 10,
        year: router.query.year,
      },
      {
        name: "Balance spent",
        value: balanceSpent,
        color: bgColors.pepper,
        percent: (((balanceSpent || 0) * 100) / (total_balances || 0)).toFixed(
          1,
        ),
        gap: 10,
        year: router.query.year,
      },
    ];

    return {
      data1: dataDashboard?.map((e) => {
        const balance_spent = e.total_balance - e.actual_balance;
        return {
          name: moment(e.month, "YYYY-MM").format("MMM"),
          balance: e.total_balance,
          balance_spent,
          balance_calculated: e.total_balance - balance_spent,
          gap: 0,
        };
      }),
      data2: overallPieChartData,
      overallBalance: total_balances,
      overallBalanceSpent: balanceSpent,
    };
  }, [dataDashboard]);

  const menu = [
    {
      value: "100",
      icon: <AdministrativeSvg color={bgColors.dark} />,
      label: "Condition",
      children: (
        <ConditionCharts
          data1={selects.data1}
          data2={selects.data2}
          overallBalance={selects.overallBalance || 0}
          overallBalanceSpent={selects.overallBalanceSpent || 0}
        />
      ),
    },
    {
      value: "200",
      icon: <FlowSvg color={bgColors.dark} />,
      label: "Transaction",
      children: <TransactionsTab />,
    },
  ];

  return (
    <Spin spinning={isLoadingDashBoard}>
      <Wrapper>
        <Segmented routerKey="mainTab" initValue="100" options={menu} />
      </Wrapper>
    </Spin>
  );
};

export default HeadSide;
