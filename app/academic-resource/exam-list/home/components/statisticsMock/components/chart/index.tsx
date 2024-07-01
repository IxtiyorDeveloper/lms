import React from "react";
import { RightElemenets, Wrapper } from "./style";
import { ITabs } from "./type";
import { Segmented } from "components";
import { useRouter } from "next/router";
import AverageScoreCalculatedInfo from "../../../statistics/components/averageCalculatedInfo";
import BarChartV2 from "./barchart";

export enum ChartTabKey {
  PROGRESS = "1",
  PASS_RATE = "2",
  AVERAGE = "3",
}

const Chart = ({ statisticsAverage, statisticsPassRate }: ITabs) => {
  const router = useRouter();
  const key = router.query?.statistic_key ?? ChartTabKey.PROGRESS;

  const options = [
    {
      value: ChartTabKey.PASS_RATE,
      label: "Pass rate",
      children: (
        <div>
          <BarChartV2
            data={statisticsPassRate}
            chartBg={`linear-gradient(to bottom, #42BD6E 0%, #7AE7A1 100%)`}
          />
        </div>
      ),
    },
    {
      value: ChartTabKey.AVERAGE,
      label: "Average score",
      children: (
        <div>
          <BarChartV2
            data={statisticsAverage}
            chartBg={`linear-gradient(to bottom, #42BD6E 0%, #7AE7A1 100%)`}
          />
        </div>
      ),
    },
  ];

  return (
    <Wrapper>
      {key === ChartTabKey.AVERAGE && (
        <RightElemenets>
          <AverageScoreCalculatedInfo />
        </RightElemenets>
      )}
      <Segmented
        options={options}
        routerKey="statistic_key"
        initValue={ChartTabKey.PASS_RATE}
      />
    </Wrapper>
  );
};

export default Chart;
