import React from "react";
import { useFreshmanLost } from "hooks";
import { useRouter } from "next/router";
import { Wrapper } from "./style";
import _ from "lodash";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { bgColors, chartColorsStatic } from "styles/theme";
import BodyCard from "../../../components/statisticsCard/components/bodyCard";
import StatisticsCard from "../../../../components/statisticsCard";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import ByTimeChart from "../../../components/statisticsCard/components/byTime";
import moment from "moment";

const ByTime = () => {
  const router = useRouter();

  const today = dayjs();
  const startOfMonth = dayjs().startOf("month");

  const { isLoading, data } = useFreshmanLost({
    query_params: {
      fields: "lostTime",
      from_date:
        router.query?.from_date || startOfMonth.format(DATE_FORMAT_YYYY_MM_DD),
      to_date: router.query?.to_date || today.format(DATE_FORMAT_YYYY_MM_DD),
      ...router.query,
    },
  });

  const getBySubLevel = (level: string) => {
    if (data?.lostTime) {
      const lostTime = data?.lostTime?.filter((fresh) =>
        fresh.type.includes(level),
      );
      const total = lostTime?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const grouped = _.groupBy(lostTime, "label");

      const dataList: {
        time: string;
        lost: number;
      }[] = [];

      Object.keys(grouped).map((key, index) => {
        const count = grouped[key].reduce((acc, cer) => {
          return acc + +cer.count;
        }, 0);
        dataList.push({
          time: moment(key, "HH:mm:ss").format("HH:mm"),
          lost: +count,
        });
      });

      return dataList;
    }
  };

  const getAllData = () => {
    return [
      {
        label: "All",
        value: 0,
        children: (
          <ByTimeChart
            barSize={60}
            color={bgColors.orange}
            dataKey="lost"
            data={getBySubLevel("") || []}
          />
        ),
      },
      {
        label: "Waiting list",
        value: 1,
        children: (
          <ByTimeChart
            barSize={60}
            color={bgColors.orange}
            dataKey="lost"
            data={getBySubLevel("Waiting list") || []}
          />
        ),
      },
      {
        label: "Regular",
        value: 2,
        children: (
          <ByTimeChart
            barSize={60}
            color={bgColors.orange}
            dataKey="lost"
            data={getBySubLevel("Regular lost") || []}
          />
        ),
      },
      {
        label: "Not Attended",
        value: 3,
        children: (
          <ByTimeChart
            barSize={60}
            color={bgColors.orange}
            dataKey="lost"
            data={getBySubLevel("Not attended lost") || []}
          />
        ),
      },
      {
        label: "Attended",
        value: 4,
        children: (
          <ByTimeChart
            barSize={60}
            color={bgColors.orange}
            dataKey="lost"
            data={getBySubLevel("Attended lost") || []}
          />
        ),
      },
    ];
  };

  return (
    <Wrapper>
      <StatisticsCard
        withTab
        full
        title="By lesson time"
        isLoading={isLoading}
        menu={getAllData()}
      />
    </Wrapper>
  );
};

export default ByTime;
