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
import { DATE_FORMAT_YYYY_MM_DD } from "../../../../../../../constants/dates";
import dayjs from "dayjs";

const ByTeacherRegularLost = () => {
  const router = useRouter();

  const currentYear = moment(new Date()).year();

  const today = dayjs();
  const startOfMonth = dayjs().startOf("month");

  const { isLoading, data } = useFreshmanLost({
    query_params: {
      type: "lostTeacher",
      from_date:
        router.query?.from_date || startOfMonth.format(DATE_FORMAT_YYYY_MM_DD),
      to_date: router.query?.to_date || today.format(DATE_FORMAT_YYYY_MM_DD),
      // status: watch()?.form,
      ...router.query,
    },
  });

  const getBySubLevel = () => {
    if (data?.lostTeacher) {
      const lostTeacher = data?.lostTeacher;
      const total = lostTeacher?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const grouped = _.groupBy(lostTeacher, "label");

      const dataList: {
        name: string;
        value: number;
        total: number;
        user: {
          image: string;
          name: string;
        };
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
          user: {
            image: grouped[key][0]?.avatar,
            name: key,
          },
          total,
          color: randomElement.getChartColorValue(chartColorsStatic, index),
        });
      });

      return dataList;
    }
  };

  return (
    <Wrapper>
      <StatisticsCard
        title="By teacher (regular lost)"
        isLoading={isLoading}
        data={getBySubLevel()}
      />
    </Wrapper>
  );
};

export default ByTeacherRegularLost;
