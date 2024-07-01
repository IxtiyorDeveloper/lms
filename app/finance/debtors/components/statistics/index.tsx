import React from "react";
import { BarWrapper, Wrapper } from "./style";
import Boxes from "./components/boxes";
import Top from "./components/top";
import { IStatistics } from "./type";
import { HorizontalBar } from "components";
import { generateChartData } from "./components/generateChartData";

const DebtorsStatistics = ({ data }: IStatistics) => {
  const chart = generateChartData({ data });
  return (
    <Wrapper>
      <Top data={data} />
      <BarWrapper>
        <HorizontalBar data={chart} />
      </BarWrapper>
      <Boxes data={data} />
    </Wrapper>
  );
};

export default DebtorsStatistics;
