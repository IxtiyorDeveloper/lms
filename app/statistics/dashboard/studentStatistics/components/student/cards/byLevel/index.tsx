import React from "react";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useStudentStatistics } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import { Wrapper } from "./style";
import _ from "lodash";
import BodyCard from "../../../../../components/statisticsCard/components/bodyCard";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";

const ByLevel = () => {
  const router = useRouter();

  const currentYear = moment(new Date()).year();

  const { isLoading, data } = useStudentStatistics({
    query_params: {
      type: "levelShare",
      year: router.query?.yearM || currentYear,
      month: router.query?.monthM,
      ...router.query,
    },
  });

  const getBySubLevel = (level: string) => {
    if (data?.levelShare) {
      const levelShare = data?.levelShare.filter((v) => {
        return v.status_label.toLowerCase().includes(level.toLowerCase());
      });
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
        initialTabValue={0}
        title="By level"
        isLoading={isLoading}
        menu={getAllData()}
      />
    </Wrapper>
  );
};

export default ByLevel;
