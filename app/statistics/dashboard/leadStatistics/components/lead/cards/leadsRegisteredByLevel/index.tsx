import React from "react";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useLeadStatistics } from "hooks";
import { useRouter } from "next/router";
import { Wrapper } from "./style";
import BodyCard from "../../../../../components/statisticsCard/components/bodyCard";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "../../../../../../../../constants/dates";

const LeadsRegisteredByLevel = () => {
  const router = useRouter();

  const { isLoading, data } = useLeadStatistics({
    query_params: {
      type: "leadByLevel",
      from_date: router.query?.from_date
        ? router.query?.from_date
        : dayjs().startOf("month").format(DATE_FORMAT_YYYY_MM_DD),
      to_date: router.query?.to_date
        ? router.query?.to_date
        : dayjs().format(DATE_FORMAT_YYYY_MM_DD),
      ...router.query,
    },
  });

  const getAllData = () => {
    if (!!data?.leadByLevel) {
      const leadByLevel = data?.leadByLevel;
      const total = leadByLevel?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const dataList: {
        name: string;
        value: number;
        total: number;
        color: string;
      }[] = [];

      const randomElement = new RandomElementOfObject();

      leadByLevel?.map((leadStatus, index) => {
        dataList.push({
          name: leadStatus.label,
          value: +leadStatus.count,
          total,
          color: randomElement.getChartColorValue(chartColorsStatic, index),
        });
      });

      return dataList;
    }
  };

  return (
    <Wrapper>
      <StatisticsCard title="Registered leads by level" isLoading={isLoading}>
        <BodyCard data={getAllData() || []} />
      </StatisticsCard>
    </Wrapper>
  );
};

export default LeadsRegisteredByLevel;
