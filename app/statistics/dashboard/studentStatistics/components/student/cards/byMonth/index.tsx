import React, { useState } from "react";
import StatisticsCard from "../../../../../components/statisticsCard";
import { useStudentStatistics } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import ByTimeChart from "../../../../../freshmanLost/components/statisticsCard/components/byTime";
import { RightChildWrapper, Wrapper } from "./style";
import { SelectYear, MySelect } from "components";
import { useForm } from "react-hook-form";
import { statisticStudentOptions } from "../types";
import { bgColors } from "styles/theme";

const ByBranch = () => {
  const router = useRouter();

  const [year, setYear] = useState<{ from_year: string; to_year: string }>({
    from_year: `${moment().year()}`,
    to_year: `${moment().year()}`,
  });

  const { control, watch } = useForm();

  const { isLoading, data } = useStudentStatistics({
    query_params: {
      type: "totalByMonth",
      from_year: year.from_year,
      to_year: year.to_year,
      status: watch()?.byBranch,
      ...router.query,
    },
  });

  const getAllData = () => {
    if (data?.totalByMonth) {
      const dataList = [
        ...data.totalByMonth.slice().sort((a, b) => {
          const dateA = moment(a.label, "YYYY-MM");
          const dateB = moment(b.label, "YYYY-MM");
          // @ts-ignore
          return dateA - dateB;
        }),
      ];
      const leftMonths = 12 - data.totalByMonth.length;

      const additional = Array(leftMonths).fill({ label: "", count: 0 });
      const halfAdd = additional.slice(0, Math.round(additional.length / 2));

      const list = [...halfAdd, ...dataList, ...halfAdd];

      return list.map((total) => {
        return {
          time: total.label
            ? moment(total.label, "YYYY-MM").format("MMM YYYY")
            : "",
          count: Number(total.count),
        };
      });
    }
  };

  return (
    <Wrapper>
      <StatisticsCard
        full
        title="By month"
        selectNode={
          <RightChildWrapper>
            <SelectYear
              isDouble
              initValue={moment().format("YYYY")}
              onChange={(e) => setYear({ from_year: `${+e - 1}`, to_year: e })}
            />
            <MySelect
              placeholder="Select"
              control={control}
              options={statisticStudentOptions}
              name="byBranch"
            />
          </RightChildWrapper>
        }
        isLoading={isLoading}
      >
        <ByTimeChart
          color={bgColors.emerald}
          barSize={40}
          dataKey="count"
          barRadius={4}
          data={getAllData() || []}
        />
      </StatisticsCard>
    </Wrapper>
  );
};

export default ByBranch;
