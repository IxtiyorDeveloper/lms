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

const ByStudentStatus = () => {
  const router = useRouter();

  const currentYear = moment(new Date()).year();

  const { isLoading, data } = useStudentStatistics({
    query_params: {
      type: "byStatus",
      year: router.query?.yearM || currentYear,
      month: router.query?.monthM,
      ...router.query,
    },
  });

  const getAllData = () => {
    if (data?.byStatus) {
      const formShare = data?.byStatus;
      const grouped = _.groupBy(formShare, "label");

      const total = formShare?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const dataList: {
        name: string;
        value: number;
        total: number;
        color: string;
      }[] = [];

      Object.keys(grouped).map((key, index) => {
        const item = grouped[key];
        const count = item.reduce((acc, cer) => {
          return acc + +cer.count;
        }, 0);

        const randomElement = new RandomElementOfObject();

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

  return (
    <Wrapper>
      <StatisticsCard title="By student's statuses" isLoading={isLoading}>
        <BodyCard data={getAllData() || []} />
      </StatisticsCard>
    </Wrapper>
  );
};

export default ByStudentStatus;
