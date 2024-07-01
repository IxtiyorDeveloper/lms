import React, { FC } from "react";
import { IPropsIncomeCard } from "../types";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useRouter } from "next/router";
import moment from "moment";
import { useIncomeStatistics } from "hooks";
import _ from "lodash";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";
import { CustomTooltipWrapper } from "../style";
import { toCurrencyWithoutSum } from "utils/toCurrencyFormat";

const RealTotalByPaymentTypes: FC<IPropsIncomeCard> = (props) => {
  const { watch } = props;

  const router = useRouter();

  const currentYear = moment(new Date()).year();
  const currentMonth = moment(new Date()).format("MM");

  const { isLoading, data } = useIncomeStatistics({
    query_params: {
      year: router.query?.year || currentYear,
      month: router.query?.month || currentMonth,
      fields: "realTotalByPaymentType",
      ...router.query,
    },
  });

  const realTotalByPaymentType = data?.realTotalByPaymentType
    .map((paymentObject) => +paymentObject.amount)
    .reduce((partialSum, a) => partialSum + a, 0);

  const getRealData = (branch_id: string) => {
    const groupedTotal = _.groupBy(data?.realTotalByPaymentType, "label");

    const results: any = {};
    Object.keys(groupedTotal)?.map((item) => {
      let m = 0;
      groupedTotal[item]?.map((r) => (m += +r.amount));
      results[item] = m;
    });

    const val: any = [];

    const randomElement = new RandomElementOfObject();

    Object.keys(results)?.map((item, index) => {
      val.push({
        name: item?.split("_").join(" ") || "",
        value: results[item],
        color: randomElement.getChartColorValue(chartColorsStatic, index),
        total: realTotalByPaymentType,
      });
    });

    return val;
  };

  return (
    <StatisticsCard
      title="By payment types"
      isCustomTooltip
      customToolTipForPieChart={(payload) => {
        const val = payload?.payload[0]?.value;
        const name = payload?.payload[0]?.name;
        const percentage = (val * 100) / (realTotalByPaymentType || 0);
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
      data={getRealData(watch("branch") as any)}
    />
  );
};

export default RealTotalByPaymentTypes;
