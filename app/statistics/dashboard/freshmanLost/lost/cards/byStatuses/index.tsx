import React, { useEffect } from "react";
import { useStudentStatistics } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import { Wrapper } from "./style";
import _ from "lodash";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";
import { useForm } from "react-hook-form";
import BodyCard from "../../../components/statisticsCard/components/bodyCard";
import StatisticsCard from "../../../../components/statisticsCard";

const ByStatuses = () => {
  const router = useRouter();

  const { control, watch, setValue } = useForm();

  const currentYear = moment(new Date()).year();

  const { isLoading, data } = useStudentStatistics({
    query_params: {
      type: "levelShare",
      year: router.query?.yearM || currentYear,
      // status: watch()?.form,
      ...router.query,
    },
  });

  const getBySubLevel = (level: string) => {
    if (data?.levelShare) {
      const levelShare = data?.levelShare?.filter((lev) =>
        lev?.level.includes(level),
      );
      const total = levelShare?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const grouped = _.groupBy(levelShare, "label");

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
        label: "Start",
        value: 1,
        children: <BodyCard data={getBySubLevel("Start")} />,
      },
      {
        label: "Middle",
        value: 2,
        children: <BodyCard data={getBySubLevel("Middle")} />,
      },
      {
        label: "Final",
        value: 3,
        children: <BodyCard data={getBySubLevel("Final")} />,
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

export default ByStatuses;
