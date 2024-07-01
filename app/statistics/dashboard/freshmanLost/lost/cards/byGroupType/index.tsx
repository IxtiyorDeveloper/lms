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

const ByGroupType = () => {
  const router = useRouter();

  const today = dayjs();
  const startOfMonth = dayjs().startOf("month");

  const { isLoading, data } = useFreshmanLost({
    query_params: {
      fields: "lostByType",
      from_date:
        router.query?.from_date || startOfMonth.format(DATE_FORMAT_YYYY_MM_DD),
      to_date: router.query?.to_date || today.format(DATE_FORMAT_YYYY_MM_DD),
      ...router.query,
    },
  });

  const getBySubLevel = (level: string) => {
    if (data?.lostByType) {
      const lostByType = data?.lostByType?.filter((fresh) =>
        fresh.type.includes(level),
      );
      const total = lostByType?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const grouped = _.groupBy(lostByType, "label");

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
        label: "Waiting list",
        value: 1,
        children: <BodyCard data={getBySubLevel("Waiting list")} />,
      },
      {
        label: "Regular",
        value: 2,
        children: <BodyCard data={getBySubLevel("Regular lost")} />,
      },
      {
        label: "Not Attended",
        value: 2,
        children: <BodyCard data={getBySubLevel("Not attended lost")} />,
      },
      {
        label: "Attended",
        value: 2,
        children: <BodyCard data={getBySubLevel("Attended lost")} />,
      },
    ];
  };

  return (
    <Wrapper>
      <StatisticsCard
        withTab
        title="By group type"
        isLoading={isLoading}
        menu={getAllData()}
      />
    </Wrapper>
  );
};

export default ByGroupType;
