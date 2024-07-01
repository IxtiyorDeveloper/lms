import React, { FC } from "react";
import Card from "./components/card";
import { StatsWrapper } from "./style";
import _ from "lodash";
import { Spin } from "antd";
import { makeData } from "./utils";
import { useSmsCounts } from "../../../../../hooks";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

export interface IStat {
  isLoading: boolean;
  data: any;
}

const colors = ["primary", "orange", "deep"];

const StatisticsCard: FC<IStat> = () => {
  const router = useRouter();
  const today = moment().format(DATE_FORMAT_YYYY_MM_DD);
  const startOfMonth = moment().startOf("month").format(DATE_FORMAT_YYYY_MM_DD);

  const { isLoading, data } = useSmsCounts({
    query_params: {
      from_date: router.query?.from_date || startOfMonth,
      to_date: router.query?.to_date || today,
      branches: router.query?.branches || null,
      service_id: router.query?.service_id,
      status: router.query.status || null,
      name: router.query.name,
    },
  });

  const dataASC = _.orderBy(data?.smsTotal?.total, ["title"], ["asc"]);
  const todayDataASC = _.orderBy(data?.smsTotal?.today, ["title"], ["asc"]);

  return (
    <Spin spinning={isLoading}>
      <StatsWrapper>
        {makeData(dataASC)?.map((stat, index) => (
          <Card
            key={index}
            total={makeData(dataASC)[index]}
            today={makeData(todayDataASC)[index]}
            color={colors[index]}
          />
        ))}
      </StatsWrapper>
    </Spin>
  );
};

export default StatisticsCard;
