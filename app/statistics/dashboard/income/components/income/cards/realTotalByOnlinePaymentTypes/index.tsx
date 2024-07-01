import React, { FC, useEffect, useState } from "react";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { useIncomeStatistics } from "hooks";
import { UseFormWatch } from "react-hook-form";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import _ from "lodash";
import { ESubPaymentPayment } from "constants/payment";
import { chartColorsStatic } from "styles/theme";
import { toCurrencyWithoutSum } from "../../../../../../../../utils/toCurrencyFormat";
import { CustomTooltipWrapper } from "./style";

const RealTotalByOnlinePaymentTypes: FC<{ watch: UseFormWatch<any> }> = (
  props,
) => {
  const { watch } = props;

  const [total, setTotal] = useState(0);

  const router = useRouter();

  const currentYear = moment(new Date()).year();
  const currentMonth = moment(new Date()).format("MM");

  const { isLoading, data } = useIncomeStatistics({
    query_params: {
      year: router.query?.year || currentYear,
      month: router.query?.month || currentMonth,
      fields: "realTotalByOnlinePaymentType",
      ...router.query,
    },
  });

  useEffect(() => {
    const allTotal = data?.realTotalByOnlinePaymentType?.reduce((acc, obj) => {
      return acc + Number(obj.amount);
    }, 0);

    if (allTotal) setTotal(allTotal);
  }, [data]);

  const dataCollector = (branch_id: string) => {
    const randomElement = new RandomElementOfObject();
    const groupBy = _.groupBy(
      data?.realTotalByOnlinePaymentType,
      "sub_payment_type",
    );

    const allTotal = data?.realTotalByOnlinePaymentType?.reduce((acc, obj) => {
      return acc + Number(obj.amount);
    }, 0);

    const paymentTypes = [
      ESubPaymentPayment.ONLINE_PLUM,
      ESubPaymentPayment.ONLINE_UZUM,
      ESubPaymentPayment.ONLINE_PAYME,
      ESubPaymentPayment.ONLINE_CLICK,
    ];

    return paymentTypes?.map((e, index) => {
      return {
        name: groupBy[e]?.length ? groupBy[e][0]?.label : "",
        value:
          groupBy[e]?.reduce((acc, cur) => {
            return acc + Number(cur?.amount);
          }, 0) ?? 0,
        color: randomElement.getChartColorValue(chartColorsStatic, index),
        total: allTotal || 0,
      };
    });
  };

  return (
    <StatisticsCard
      isLoading={isLoading}
      isCustomTooltip
      customToolTipForPieChart={(payload) => {
        const val = payload?.payload[0]?.value;
        const name = payload?.payload[0]?.name;
        const percentage = (val * 100) / total;
        return (
          <CustomTooltipWrapper>
            <div className="flex">
              <p>{name}</p>
              <p>{percentage}%</p>
            </div>
            <p>{toCurrencyWithoutSum(val)}</p>
          </CustomTooltipWrapper>
        );
      }}
      title="By online payment types"
      data={dataCollector(watch("branch") as any)}
    />
  );
};

export default RealTotalByOnlinePaymentTypes;
