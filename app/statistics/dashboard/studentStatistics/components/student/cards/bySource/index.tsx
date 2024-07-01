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

const ByBranch = () => {
  const router = useRouter();

  const { control, getValues, watch, setValue } = useForm();
  const [filter, setFilter] = useState<string[]>([]);

  const currentYear = moment(new Date()).year();

  const { isLoading, data } = useStudentStatistics({
    query_params: {
      type: "sourceShare",
      year: router.query?.yearM || currentYear,
      month: router.query?.monthM,
      ...router.query,
    },
  });

  const example = _.uniqBy(data?.sourceShare, "status_label");

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
    if (data?.sourceShare) {
      const sourceShare = data?.sourceShare.filter((v) =>
        filter.includes(v.status.toLowerCase()),
      );
      const total = sourceShare?.reduce((acc, cer) => {
        return acc + +cer.count;
      }, 0);

      const grouped = _.groupBy(sourceShare, "label");

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
        title="By source"
        isLoading={isLoading}
      >
        <BodyCard data={getAllData() || []} />
      </StatisticsCard>
    </Wrapper>
  );
};

export default ByBranch;
