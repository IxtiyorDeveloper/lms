import React from "react";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useLeadStatistics } from "hooks";
import { useRouter } from "next/router";
import { Wrapper } from "./style";
import _ from "lodash";
import BodyCard from "../../../../../components/statisticsCard/components/bodyCard";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "../../../../../../../../constants/dates";

const LeadsBySources = () => {
  const router = useRouter();

  const { isLoading, data } = useLeadStatistics({
    query_params: {
      type: "leadBySource",
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
    if (!!data?.leadBySource) {
      const leadBySource = data?.leadBySource;
      const total = leadBySource?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const grouped = _.groupBy(leadBySource, "name");

      const dataList: {
        name: string;
        value: number;
        total: number;
        user: {
          name: string;
          image: string;
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
          user: {
            name: key,
            image: grouped[key][0]?.icon,
          },
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
      <StatisticsCard title="Leads by source" isLoading={isLoading}>
        <BodyCard data={getAllData() || []} />
      </StatisticsCard>
    </Wrapper>
  );
};

export default LeadsBySources;
