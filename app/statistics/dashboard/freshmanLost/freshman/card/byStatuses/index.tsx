import React, { useEffect } from "react";
import { useFreshmanLost, useStudentStatistics } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import { Wrapper } from "./style";
import _ from "lodash";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";
import { useForm } from "react-hook-form";
import BodyCard from "../../../components/statisticsCard/components/bodyCard";
import StatisticsCard from "../../../../components/statisticsCard";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

const ByStatuses = () => {
  const router = useRouter();

  const { control, watch, setValue } = useForm();

  const currentYear = moment(new Date()).year();

  const today = dayjs();
  const startOfMonth = dayjs().startOf("month");

  const { isLoading, data } = useFreshmanLost({
    query_params: {
      fields: "freshmanStatus",
      from_date:
        router.query?.from_date || startOfMonth.format(DATE_FORMAT_YYYY_MM_DD),
      to_date: router.query?.to_date || today.format(DATE_FORMAT_YYYY_MM_DD),
      ...router.query,
    },
  });

  const getBySubLevel = (level: string) => {
    if (data?.freshmanStatus) {
      const freshmanStatus = data?.freshmanStatus?.filter((fresh) =>
        fresh.type.includes(level),
      );
      const total = freshmanStatus?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const grouped = _.groupBy(freshmanStatus, "type");

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
        title="By status"
        isLoading={isLoading}
        menu={getAllData()}
      />
    </Wrapper>
  );
};

export default ByStatuses;
