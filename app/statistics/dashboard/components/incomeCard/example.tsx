import React from "react";
// @ts-ignore
import GaugeChart from "react-responsive-gauge-chart";
import { bgColors, textColors } from "styles/theme";

const MyGaugeChart = () => {
  return (
    <div style={{ height: "200px", width: "200px" }}>
      <GaugeChart
        id="gauge-chart2"
        nrOfLevels={2}
        colors={["#FF5F6D", "#000"]}
        arcWidth={0.2}
        percent={1 / 2}
        needleColor={bgColors.blueGray}
        needleBaseColor={bgColors.ginger}
        textColor={textColors.sceptreBlue}
        textAlign={"center"}
        hideText={false}
        animate={true}
      />
    </div>
  );
};

export default MyGaugeChart;
