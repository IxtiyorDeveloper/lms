import React, { FC } from "react";
import { Wrapper } from "./style";
import StatisticsCard from "../../../statisticsCard";
import { bgColors } from "styles/theme";

interface IProps {
  byAmount: any[];
  byMoney: any[];
}

const Difference: FC<IProps> = ({ byAmount, byMoney }) => {
  return (
    <Wrapper>
      <h2 className="title-stat" style={{ padding: "0 0 30px 0" }}>
        Difference
      </h2>
      <StatisticsCard
        full
        isAreaChart={true}
        title="By amount"
        colors={[bgColors.deep, bgColors.pop]}
        data={byAmount}
        findField="day"
        count1="freshman"
        count2="lost"
        x="day"
      />
      <StatisticsCard
        full
        isAreaChart={true}
        title="By money"
        colors={[bgColors.midori, bgColors.orange]}
        data={byMoney}
        findField="day"
        count1="freshman"
        count2="lost"
        x="day"
      />
    </Wrapper>
  );
};

export default Difference;
