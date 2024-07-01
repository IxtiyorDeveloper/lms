import React from "react";
import { RightElemenets, Wrapper } from "./style";
import { ITabs } from "./type";
import BarChartV2 from "../barchart";
import { Segmented } from "components";
import ExamStatusProgress from "../statusProgress";
import AverageScoreCalculatedInfo from "../averageCalculatedInfo";
import { useRouter } from "next/router";

export enum ChartTabKey {
  PROGRESS = "1",
  PASS_RATE = "2",
  AVERAGE = "3",
}

const Chart = ({
  examProgress,
  statisticsAverage,
  statisticsPassRate,
}: ITabs) => {
  const router = useRouter();
  const key = router.query?.statistic_key ?? ChartTabKey.PROGRESS;

  const options = [
    {
      value: ChartTabKey.PROGRESS,
      label: "Exam progress",
      children: (
        <div>
          <ExamStatusProgress examProgress={examProgress} />
        </div>
      ),
    },
    {
      value: ChartTabKey.PASS_RATE,
      label: "Pass rate",
      children: (
        <div>
          <BarChartV2
            data={statisticsPassRate ?? []}
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
            data={statisticsAverage ?? []}
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
        initValue={ChartTabKey.PROGRESS}
      />
    </Wrapper>
  );
};

export default Chart;
