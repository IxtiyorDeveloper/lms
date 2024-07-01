import React from "react";
import { useFreshmanLost } from "hooks";
import { useRouter } from "next/router";
import { Wrapper } from "./style";
import _ from "lodash";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";
import BodyCard from "../../../components/statisticsCard/components/bodyCard";
import StatisticsCard from "../../../../components/statisticsCard";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

const ByLevel = () => {
  const router = useRouter();

  const today = dayjs();
  const startOfMonth = dayjs().startOf("month");

  const { isLoading, data } = useFreshmanLost({
    query_params: {
      fields: "freshmanLevel",
      from_date:
        router.query?.from_date || startOfMonth.format(DATE_FORMAT_YYYY_MM_DD),
      to_date: router.query?.to_date || today.format(DATE_FORMAT_YYYY_MM_DD),
      ...router.query,
    },
  });

  const getBySubLevel = (level: string) => {
    if (data?.freshmanLevel) {
      const freshmanLevel = data?.freshmanLevel?.filter((fresh) =>
        fresh.type.includes(level),
      );
      const total = freshmanLevel?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const grouped = _.groupBy(freshmanLevel, "name");

      const dataList: {
        name: string;
        value: number;
        total: number;
        color: string;
      }[] = [];

      const randomElement = new RandomElementOfObject();

      Object.keys(grouped).map((key, index) => {
        const count = grouped[key].reduce((acc, cer) => {
          return acc + +cer.count;
        }, 0);
        dataList.push({
          name: key,
          value: count,
          total,
          color: randomElement.getChartColorValue(chartColorsStatic, index),
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
        children: <BodyCard data={getBySubLevel("")} />,
      },
      {
        label: "New Freshman",
        value: 1,
        children: <BodyCard data={getBySubLevel("New freshmen")} />,
      },
      {
        label: "Old Freshman",
        value: 2,
        children: <BodyCard data={getBySubLevel("Old freshman")} />,
      },
    ];
  };

  return (
    <Wrapper>
      <StatisticsCard
        withTab
        title="By level"
        isLoading={isLoading}
        menu={getAllData()}
      />
    </Wrapper>
  );
};

export default ByLevel;
