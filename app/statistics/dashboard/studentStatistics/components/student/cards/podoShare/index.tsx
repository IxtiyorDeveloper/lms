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

const PodoShare = () => {
  const router = useRouter();

  const currentYear = moment(new Date()).year();
  const { control, getValues, watch, setValue } = useForm();

  const { isLoading, data } = useStudentStatistics({
    query_params: {
      type: "podoShare",
      year: router.query?.yearM || currentYear,
      month: router.query?.month,
      ...router.query,
    },
  });
  const [filter, setFilter] = useState<string[]>([]);

  const example = _.uniqBy(data?.podoShare, "status_label");

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
    if (data?.podoShare) {
      const podoShare = data?.podoShare.filter((v) =>
        filter.includes(v.status.toLowerCase()),
      );
      const grouped = _.groupBy(podoShare, "label");

      const total = podoShare?.reduce((acc, cer) => {
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
        title="By PODO"
        isLoading={isLoading}
      >
        <BodyCard data={getAllData() || []} />
      </StatisticsCard>
    </Wrapper>
  );
};

export default PodoShare;
