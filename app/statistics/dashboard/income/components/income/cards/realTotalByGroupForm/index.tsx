import React, { useEffect, useState } from "react";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useIncomeStatistics } from "hooks";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";
import {
  GROUP_FORM_GROUP,
  GROUP_FORM_INDIVIDUAL,
} from "../../../../../../../../constants/groupForms";
import { CustomTooltipWrapper } from "../style";
import { toCurrencyWithoutSum } from "../../../../../../../../utils/toCurrencyFormat";

const RealTotalByGroupForm = () => {
  const router = useRouter();

  const [realTotal, setRealTotal] = useState(0);

  const currentYear = moment(new Date()).year();
  const currentMonth = moment(new Date()).format("MM");

  const { data, isLoading } = useIncomeStatistics({
    query_params: {
      year: router.query?.year || currentYear,
      month: router.query?.month || currentMonth,
      fields: "realTotalByGroupForm",
      ...router.query,
    },
  });

  useEffect(() => {
    const allTotal = data?.realTotalByGroupForm?.reduce((acc, obj) => {
      return acc + Number(obj.amount);
    }, 0);

    if (allTotal) setRealTotal(allTotal);
  }, [data]);

  const getData = () => {
    const randomElement = new RandomElementOfObject();

    const realTotalByGroupForm = data?.realTotalByGroupForm;

    const individual = realTotalByGroupForm?.filter(
      (groupFormObject) =>
        +groupFormObject.group_form === GROUP_FORM_INDIVIDUAL,
    );
    const group = realTotalByGroupForm?.filter(
      (groupFormObject) => +groupFormObject.group_form === GROUP_FORM_GROUP,
    );

    const individualTotal = individual?.reduce((acc, obj) => {
      return acc + Number(obj.amount);
    }, 0);

    const groupTotal = group?.reduce((acc, obj) => {
      return acc + Number(obj.amount);
    }, 0);

    const allTotal = realTotalByGroupForm?.reduce((acc, obj) => {
      return acc + Number(obj.amount);
    }, 0);

    return [
      {
        name: "Group",
        value: groupTotal || 0,
        color: randomElement.getChartColorValue(chartColorsStatic, 0),
        total: allTotal || 0,
      },
      {
        name: "Individual",
        value: individualTotal || 0,
        color: randomElement.getChartColorValue(chartColorsStatic, 1),
        total: allTotal || 0,
      },
    ];
  };

  return (
    <StatisticsCard
      isCustomTooltip
      customToolTipForPieChart={(payload) => {
        const val = payload?.payload[0]?.value;
        const name = payload?.payload[0]?.name;
        const percentage = (val * 100) / (realTotal || 0);
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
      isLoading={isLoading}
      title="Total by group form"
      data={getData()}
    />
  );
};

export default RealTotalByGroupForm;
