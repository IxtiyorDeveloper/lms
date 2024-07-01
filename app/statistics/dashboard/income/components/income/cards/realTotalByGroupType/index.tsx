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

const RealTotalByGroupType = () => {
  const router = useRouter();

  const [total, setTotal] = useState(0);

  const currentYear = moment(new Date()).year();
  const currentMonth = moment(new Date()).format("MM");

  const { data, isLoading } = useIncomeStatistics({
    query_params: {
      year: router.query?.year || currentYear,
      month: router.query?.month || currentMonth,
      fields: "realTotalByGroupType",
      ...router.query,
    },
  });

  useEffect(() => {
    const allTotal = data?.realTotalByGroupType?.reduce((acc, obj) => {
      return acc + Number(obj.amount);
    }, 0);

    if (allTotal) setTotal(allTotal);
  }, [data]);

  const getData = () => {
    const randomElement = new RandomElementOfObject();

    const realTotalByGroupType = data?.realTotalByGroupType;

    const allTotal = realTotalByGroupType?.reduce((acc, obj) => {
      return acc + Number(obj.amount);
    }, 0);

    return realTotalByGroupType?.map((obj, index) => {
      return {
        name: obj?.group_type,
        value: Number(obj?.amount),
        color: randomElement.getChartColorValue(chartColorsStatic, index),
        total: allTotal || 0,
      };
    });
  };

  return (
    <StatisticsCard
      isCustomTooltip
      customToolTipForPieChart={(payload) => {
        const val = payload?.payload[0]?.value;
        const name = payload?.payload[0]?.name;
        const percentage = (val * 100) / (total || 0);
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
      title="By group type"
      data={getData()}
    />
  );
};

export default RealTotalByGroupType;
