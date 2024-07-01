import React from "react";
import { Wrapper } from "./style";
import Card from "./components/card";
import Router, { useRouter } from "next/router";
import { useFreshmanLost } from "hooks";
import dayjs from "dayjs";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { Spin } from "antd";

const Cards = () => {
  const router = useRouter();

  const date = dayjs();

  const { isLoading, data } = useFreshmanLost({
    query_params: {
      ...router.query,
      fields: "freshman,lost",
      from_date:
        router.query?.from_date ||
        date.startOf("month").format(DATE_FORMAT_YYYY_MM_DD),
      to_date: router.query?.to_date || date.format(DATE_FORMAT_YYYY_MM_DD),
    },
  });

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <Card
          color={"midori"}
          count={data?.freshman?.count || "0"}
          balance={data?.freshman?.balance || "0"}
          href="/statistics/dashboard/freshman-and-lost/freshman"
        />
        <Card
          color={"pop"}
          count={data?.lost?.count || "0"}
          balance={`-${data?.lost?.balance}` || "0"}
          href="/statistics/dashboard/freshman-and-lost/lost?roundedTabIndex=1&tab_id=-600&page=1&pageSize=20"
        />
        <Card
          color={"dark"}
          count={
            data?.freshman
              ? `${+data?.freshman?.count - +data?.lost?.count}`
              : "0"
          }
          balance={
            data?.freshman
              ? `${+data?.freshman?.balance - +data?.lost?.balance}`
              : "0"
          }
          href=""
        />
      </Wrapper>
    </Spin>
  );
};

export default Cards;
