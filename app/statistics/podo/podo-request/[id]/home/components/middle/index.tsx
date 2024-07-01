import React from "react";
import { Box, Title, Wrapper } from "./style";
import TopComponent from "./components/top";
import { IMiddleType } from "./type";
import { HorizontalBar } from "components";
import { generateChartData } from "./components/generateChartData";

const MiddleSide = ({ data }: IMiddleType) => {
  const chart = generateChartData({ data });
  return (
    <Wrapper>
      <TopComponent data={data} />
      <Box>
        <Title>Progress</Title>
        <HorizontalBar data={chart} />
      </Box>
    </Wrapper>
  );
};

export default MiddleSide;
