import React, { useEffect, useState } from "react";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useStudentStatistics } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import { Wrapper } from "./style";
import _ from "lodash";
import BodyCard from "../../../../../components/statisticsCard/components/bodyCard";
import { RandomElementOfObject } from "utils/randomElementOfObject";
import { chartColorsStatic } from "styles/theme";
import { RightChildWrapper } from "../bySource/style";
import { MySelect } from "components";
import { useForm } from "react-hook-form";

const ByGroupType = () => {
  const router = useRouter();

  const currentYear = moment(new Date()).year();
  const { control, getValues, watch, setValue } = useForm();

  const [filter, setFilter] = useState<string[]>([]);

  const { isLoading, data } = useStudentStatistics({
    query_params: {
      type: "groupTypeShare",
      year: router.query?.yearM || currentYear,
      month: router.query?.monthM,
      ...router.query,
    },
  });

  const example = _.uniqBy(data?.groupTypeShare, "status_label");

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
    if (data?.groupTypeShare) {
      const formShare = data?.groupTypeShare.filter((v) =>
        filter.includes(v.status.toLowerCase()),
      );
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
        title="By group type"
        isLoading={isLoading}
      >
        <BodyCard data={getAllData() || []} />
      </StatisticsCard>
    </Wrapper>
  );
};

export default ByGroupType;
