import React from "react";
import StatisticsCard from "../../../../../components/statisticsCard";
import { Wrapper } from "./style";
import { useIncomeStatistics } from "hooks";
import { useRouter } from "next/router";
import moment from "moment/moment";
import ByTimeChart from "../../../../../components/statisticsCard/components/byTime";

const RealTotalByHourAndWeek = () => {
  const router = useRouter();

  const currentYear = moment(new Date()).year();
  const currentMonth = moment(new Date()).format("MM");

  const { isLoading, data } = useIncomeStatistics({
    query_params: {
      year: router.query?.year || currentYear,
      month: router.query?.month || currentMonth,
      fields: "realTotalByHour,realTotalByWeek",
      ...router.query,
    },
  });

  const getFullData = () => {
    const dataBarChart = data?.realTotalByHour?.map((e) => {
      return {
        time: e.hour,
        lost: +e.amount,
      };
    });

    const dataBarChartByWeek = data?.realTotalByWeek?.map((e) => {
      return {
        time: e.week,
        lost: +e.amount,
      };
    });

    const sortDataByWeekdays = (data?: any[]): any[] | undefined => {
      const weekdaysOrder: { [key: string]: number } = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 7,
      };

      return data?.sort((a, b) => {
        return weekdaysOrder[a.time] - weekdaysOrder[b.time];
      });
    };

    return [
      {
        label: "By hour",
        value: 1,
        children: <ByTimeChart barSize={50} data={dataBarChart || []} />,
      },
      {
        label: "By weekday",
        value: 2,
        children: (
          <ByTimeChart
            barSize={100}
            data={sortDataByWeekdays(dataBarChartByWeek) || []}
          />
        ),
      },
    ];
  };

  return (
    <Wrapper>
      <StatisticsCard
        isLoading={isLoading}
        withTab
        full
        initialTabValue={0}
        menu={getFullData()}
        title="By payment time"
      />
    </Wrapper>
  );
};

export default RealTotalByHourAndWeek;
