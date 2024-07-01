import React, { useEffect, useState } from "react";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useIncomeStatistics } from "hooks";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";
import { CustomTooltipWrapper } from "../style";
import { toCurrencyWithoutSum } from "../../../../../../../../utils/toCurrencyFormat";
import total from "../../../../../../../finance/payment-statistics/components/total";

const RealTotalByBranches = () => {
  const router = useRouter();

  const currentYear = moment(new Date()).year();
  const currentMonth = moment(new Date()).format("MM");

  const { data, isLoading } = useIncomeStatistics({
    query_params: {
      year: router.query?.year || currentYear,
      month: router.query?.month || currentMonth,
      fields: "realTotalByBranch",
      ...router.query,
    },
  });

  const [totalSum, setTotalSum] = useState(
    data?.realTotalByBranch?.reduce((acc, obj) => {
      return acc + Number(obj.amount);
    }, 0)
  );

  useEffect(() => {
    const allTotal = data?.realTotalByBranch?.reduce((acc, obj) => {
      return acc + Number(obj.amount);
    }, 0);

    if (allTotal) setTotalSum(allTotal);
  }, [data]);

  const getData = () => {
    const randomElement = new RandomElementOfObject();

    const realTotalByBranch = data?.realTotalByBranch;

    const allTotal = realTotalByBranch?.reduce((acc, obj) => {
      return acc + Number(obj.amount);
    }, 0);

    return realTotalByBranch?.map((e, index) => {
      return {
        // @ts-ignore
        name: e["IFNULL(branch.name, 'Unknown')"] || e?.name || "",
        value: +e.amount,
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
        const nameA = payload?.payload[0]?.name;
        const percentage = (val * 100) / (totalSum || 0);
        return (
          <CustomTooltipWrapper>
            <div className="flex">
              <p>{nameA}</p>
              <p>{percentage.toFixed(1)}%</p>
            </div>
            <p>{toCurrencyWithoutSum(val)}</p>
          </CustomTooltipWrapper>
        );
      }}
      isLoading={isLoading}
      title="By branch"
      data={getData()}
    />
  );
};

export default RealTotalByBranches;
