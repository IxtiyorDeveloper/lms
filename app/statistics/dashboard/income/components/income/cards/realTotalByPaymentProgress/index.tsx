import React from "react";
import {
  BarWrapper,
  LabelWrapper,
  Overall,
  ProgressTooltip,
  Wrapper,
} from "./style";
import { useIncomeStatistics } from "hooks";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { toCurrencyFormat, toCurrencyWithoutSum } from "utils/toCurrencyFormat";
import {
  CalendarSimpleSvg,
  CircleDollarSvg,
  ProgressSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import StatisticsCard from "../../../../../components/statisticsCard";
import ByTimeChart from "../../../../../components/statisticsCard/components/byTime";
import SingleAreaChart from "../../../../../components/statisticsCard/components/singleAreaChart";

const RealTotalByPaymentProgress = () => {
  const router = useRouter();

  const currentYear = moment(new Date()).year();
  const currentMonth = moment(new Date()).format("MM");

  const { isLoading, data } = useIncomeStatistics({
    query_params: {
      year: router.query?.year || currentYear,
      month: router.query?.month || currentMonth,
      fields: "realTotalProgress,realTotalByWeek",
      ...router.query,
    },
  });

  const getAllPayment = () => {
    return data?.realTotalProgress?.reduce(
      (acc, cer) => +acc + Number(cer?.day_income),
      0,
    );
  };

  const getFullData = () => {
    const realTotalByProgress = data?.realTotalProgress;

    const sortedByBarChartData = realTotalByProgress?.slice().sort((a, b) => {
      const dateA = moment(a.date);
      const dateB = moment(b.date);
      // @ts-ignore
      return dateA - dateB;
    });

    const byBarChartData = sortedByBarChartData?.map((realT) => {
      return {
        time: moment(realT.date).format("DD MMM"),
        lost: +realT.day_income,
        all: realT,
      };
    });

    return [
      {
        label: (
          <LabelWrapper>
            <ProgressSvg color={bgColors.dark} /> Payment progress
          </LabelWrapper>
        ),
        value: 1,
        children: (
          <SingleAreaChart
            customTooltipForDailyIncome={(payload) => {
              return (
                <ProgressTooltip>
                  <div className="flex border">
                    <p className="overall-progress-proportion">
                      {payload.payload[0]?.payload?.all?.progress}%{" "}
                      <span className="payment">Payment</span>
                    </p>
                    <p className="daily-progress-proportion">
                      +{payload.payload[0]?.payload?.all?.day_progress}%
                    </p>
                  </div>
                  <div className="flex">
                    <p className="overall-progress">
                      {toCurrencyFormat(
                        +Number(
                          payload.payload[0]?.payload?.all?.amount,
                        )?.toFixed(0),
                      )}
                    </p>
                    <p className="daily-progress">
                      +
                      {toCurrencyFormat(
                        +Number(
                          payload.payload[0]?.payload?.all?.day_income,
                        )?.toFixed(0),
                      )}
                    </p>
                  </div>
                </ProgressTooltip>
              );
            }}
            data={byBarChartData}
            x="time"
            y="lost"
          />
        ),
      },
      {
        label: (
          <LabelWrapper>
            <CalendarSimpleSvg color={bgColors.dark} /> Daily payment
          </LabelWrapper>
        ),
        value: 2,
        children: (
          <BarWrapper style={{ marginTop: "10px" }}>
            <ByTimeChart
              isBrush
              color={bgColors.emerald}
              barSize={20}
              barBorderRadius={4}
              data={byBarChartData || []}
            />
          </BarWrapper>
        ),
      },
    ];
  };

  return (
    <Wrapper>
      <StatisticsCard
        full
        withTab
        initialTabValue={0}
        menu={getFullData()}
        isLoading={isLoading}
        reversedComplexThinTab={false}
        title={
          <Overall>
            <CircleDollarSvg />
            <p>{toCurrencyWithoutSum(getAllPayment())}</p>
            <p className="payed-text">
              <span className="sum-curr">UZS</span> Payed
            </p>
          </Overall>
        }
      />
    </Wrapper>
  );
};

export default RealTotalByPaymentProgress;
