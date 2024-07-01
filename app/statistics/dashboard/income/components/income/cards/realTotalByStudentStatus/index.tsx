import moment from "moment";
import React, { FC } from "react";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
} from "constants/studentStatuses";
import { useRouter } from "next/router";
import { useIncomeStatistics } from "hooks";
import { IPropsIncomeCard } from "../types";
import { chartColorsStatic } from "styles/theme";
import { toCurrencyWithoutSum } from "utils/toCurrencyFormat";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import StatisticsCard from "../../../../../components/statisticsCard";
import { CustomTooltipWrapper } from "../realTotalByOnlinePaymentTypes/style";
import BodyCard from "../../../../../components/statisticsCard/components/bodyCard";

const RealTotalByStudentStatus: FC<IPropsIncomeCard> = () => {
  const router = useRouter();

  const currentYear = moment(new Date()).year();
  const currentMonth = moment(new Date()).format("MM");

  const { isLoading, data } = useIncomeStatistics({
    query_params: {
      year: router.query?.year || currentYear,
      month: router.query?.month || currentMonth,
      fields: "totalByStudentStatus",
      ...router.query,
    },
  });

  const statuses = [+NEW_STUDENT_NOT_ATTENDED, +NEW_STUDENT_ATTENDED];

  const realTotalByStudentStatus = data?.totalByStudentStatus;

  const filteredA = data?.totalByStudentStatus?.filter(
    (d) => !statuses.includes(+d?.status),
  );

  const debtTotal = realTotalByStudentStatus?.reduce((acc, curr) => {
    return acc + Number(curr.debt);
  }, 0);

  const balanceTotal = realTotalByStudentStatus?.reduce((acc, curr) => {
    return acc + Number(curr.balance);
  }, 0);

  const total = (debtTotal || 0) + (balanceTotal || 0);

  const debtTotalOnly = filteredA?.reduce((acc, curr) => {
    return acc + Number(curr.debt);
  }, 0);

  const balanceTotalOnly = filteredA?.reduce((acc, curr) => {
    return acc + Number(curr.balance);
  }, 0);

  const totalOnly = (debtTotalOnly || 0) + (balanceTotalOnly || 0);

  const getRealData = () => {
    const val: any = [];

    const randomElement = new RandomElementOfObject();

    const dataForAll = data?.totalByStudentStatus?.map((ref, index) => {
      return {
        name:
          ref.label.split("_").join(" ").toLowerCase().charAt(0).toUpperCase() +
          ref.label
            .split("_")
            .join(" ")
            .toLowerCase()
            .slice(1, ref.label.length),
        value: +ref.debt,
        color: randomElement.getChartColorValue(chartColorsStatic, index + 1),
        total,
      };
    });

    dataForAll?.unshift({
      name: "Paid",
      value: balanceTotal || 0,
      color: randomElement.getChartColorValue(chartColorsStatic, 0),
      total,
    });

    const filtered = data?.totalByStudentStatus?.filter(
      (d) => !statuses.includes(+d?.status),
    );

    const dataForA = filtered?.map((ref, index) => {
      return {
        name:
          ref.label.split("_").join(" ").toLowerCase().charAt(0).toUpperCase() +
          ref.label
            .split("_")
            .join(" ")
            .toLowerCase()
            .slice(1, ref.label.length),
        value: +ref.debt,
        color: randomElement.getChartColorValue(chartColorsStatic, index + 1),
        total: totalOnly,
      };
    });

    dataForA?.unshift({
      name: "Paid",
      value: balanceTotal || 0,
      color: randomElement.getChartColorValue(chartColorsStatic, 0),
      total: totalOnly,
    });

    val.push(
      {
        label: "All",
        children: (
          <BodyCard
            isCustomTooltip
            customTooltip={(payload) => {
              const val = payload?.payload[0]?.value;
              const name = payload?.payload[0]?.name;
              const percentage = (val * 100) / total;
              return (
                <CustomTooltipWrapper>
                  <div className="flex">
                    <p>{name}</p>
                    <p>{percentage.toFixed(1)}%</p>
                  </div>
                  <p>{toCurrencyWithoutSum(val)}</p>
                </CustomTooltipWrapper>
              );
            }}
            data={[...(dataForAll || [])]}
          />
        ),
      },
      {
        label: "Only active",
        children: (
          <BodyCard
            isCustomTooltip
            data={dataForA}
            customTooltip={(payload) => {
              const val = payload?.payload[0]?.value;
              const name = payload?.payload[0]?.name;
              const percentage = (val * 100) / total;
              return (
                <CustomTooltipWrapper>
                  <div className="flex">
                    <p>{name}</p>
                    <p>{percentage.toFixed(1)}%</p>
                  </div>
                  <p>{toCurrencyWithoutSum(val)}</p>
                </CustomTooltipWrapper>
              );
            }}
          />
        ),
      },
    );

    return val;
  };

  return (
    <StatisticsCard
      title="Debtors"
      withTab
      initialTabValue={0}
      menu={getRealData()}
      isLoading={isLoading}
    />
  );
};

export default RealTotalByStudentStatus;
