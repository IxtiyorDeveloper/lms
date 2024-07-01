import React, { useEffect, useState } from "react";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useGroupStatistics, usePageDataMemo } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import { Wrapper } from "./style";
import _ from "lodash";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";
import { MySelect } from "../../../../../../../../components";
import { useForm } from "react-hook-form";

const BySubLevel = () => {
  const router = useRouter();

  const { control, setValue, watch } = useForm();

  const selects = usePageDataMemo();

  const month = router.query.monthM || moment().format("MM");
  const year = router.query.yearM || moment().format("YYYY");
  const branches = Array.isArray(router.query.branches)
    ? router.query.branches.map((l) => +l)
    : !!router.query.branches
      ? [Number(router.query.branches)]
      : null;

  const { isLoading, data } = useGroupStatistics({
    query_params: {
      type: "bySubLevel",
      year: year,
      month: month,
      branches: branches,
      levelIds: watch("level"),
    },
  });

  useEffect(() => {
    setValue(
      "level",
      selects?.level?.options?.map((l) => l.value),
    );
  }, []);

  const getAllData = () => {
    if (data?.bySubLevel) {
      const groupStatusShare = data?.bySubLevel;
      const grouped = _.groupBy(groupStatusShare, "label");

      const total = groupStatusShare?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const dataList: {
        name: string;
        value: number;
        total: number;
        color: string;
      }[] = [];

      const randomElement = new RandomElementOfObject();

      Object.keys(grouped).map((key, index) => {
        const item = grouped[key];
        const count = item.reduce((acc, cer) => {
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

  return (
    <Wrapper>
      <StatisticsCard
        title="Groups by sublevel"
        selectNode={
          <MySelect
            name="level"
            mode="multiple"
            control={control}
            maxTagCount={2}
            placeholder="Select"
            options={selects.level?.options}
          />
        }
        data={getAllData()}
        isLoading={isLoading}
      />
    </Wrapper>
  );
};

export default BySubLevel;
