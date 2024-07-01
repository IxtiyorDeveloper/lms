import React, { useEffect, useState } from "react";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useStudentStatistics } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import { RightChildWrapper, Wrapper } from "./style";
import _ from "lodash";
import BodyCard from "../../../../../components/statisticsCard/components/bodyCard";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";
import { MySelect } from "components";
import { useForm } from "react-hook-form";
import { DATE_FORMAT_HH_mm, DATE_FORMAT_HH_mm_ss } from "constants/dates";

const ByTime = () => {
  const router = useRouter();

  const { control, setValue, getValues, watch } = useForm();

  const [filter, setFilter] = useState<string[]>([]);

  const currentYear = moment(new Date()).year();

  const { isLoading, data } = useStudentStatistics({
    query_params: {
      type: "timeShare",
      year: router.query?.yearM || currentYear,
      month: router.query?.monthM,
      ...router.query,
    },
  });

  const example = _.uniqBy(data?.timeShare, "status_label");

  const options = example.map((a) => {
    return { label: a.status_label, value: a.status.toLowerCase() };
  });

  useEffect(() => {
    setValue(
      "form",
      options.map((v) => v.value),
    );
  }, [data]);

  useEffect(() => {
    setFilter(getValues("form"));
  }, [watch()]);

  const getAllData = () => {
    if (data?.timeShare) {
      const timeShare = data?.timeShare.filter((v) =>
        filter.includes(v.status.toLowerCase()),
      );
      const total = timeShare?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const grouped = _.groupBy(timeShare, "label");

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
          name: moment(key, DATE_FORMAT_HH_mm_ss).format(DATE_FORMAT_HH_mm),
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
        selectNode={
          <RightChildWrapper>
            <MySelect
              placeholder="Select"
              name="form"
              control={control}
              options={options}
              mode="multiple"
              maxTagCount={1}
            />
          </RightChildWrapper>
        }
        title="By time"
        isLoading={isLoading}
      >
        <BodyCard data={getAllData() || []} />
      </StatisticsCard>
    </Wrapper>
  );
};

export default ByTime;
