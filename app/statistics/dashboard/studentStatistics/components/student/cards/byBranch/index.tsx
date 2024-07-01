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
import { IStatisticsStudentType, statisticStudentOptions } from "../types";
import { filter } from "d3-array";

const ByBranch = () => {
  const router = useRouter();

  const { control, watch, getValues, setValue } = useForm();

  const currentYear = moment(new Date()).year();

  const [formValue, setFormValue] = useState<string[]>([]);

  const { isLoading, data } = useStudentStatistics({
    query_params: {
      type: "branchShare",
      year: router.query?.yearM || currentYear,
      month: router.query?.monthM,
      ...router.query,
    },
  });

  const example = _.uniqBy(data?.branchShare, "status_label");

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
    setFormValue(getValues("form"));
  }, [watch()]);

  const getAllData = () => {
    if (data?.branchShare) {
      const branchShare = data?.branchShare.filter((v) =>
        formValue.includes(v.status.toLowerCase()),
      );
      const total = branchShare?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const grouped = _.groupBy(branchShare, "label");

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
        title="By branch"
        isLoading={isLoading}
      >
        <BodyCard data={getAllData() || []} />
      </StatisticsCard>
    </Wrapper>
  );
};

export default ByBranch;
