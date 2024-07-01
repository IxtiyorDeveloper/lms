import React, { FC } from "react";
import { IStatisticsCard } from "./type";
import { ChartWrapper } from "./style";
import BodyCard from "./components/bodyCard";
import { ComplexThinTab } from "components";
import DifferenceArea from "./components/differenceArea";

const StatisticsCard: FC<IStatisticsCard> = ({
  title,
  data,
  withTab = false,
  menu,
  colors,
  isAreaChart,
  full,
  findField,
  count1,
  count2,
  x,
}) => {
  return (
    <ChartWrapper
      style={full ? { gridColumn: "1/3", marginBottom: "20px" } : {}}
    >
      {!isAreaChart ? (
        withTab ? (
          <ComplexThinTab
            reversed
            topLeftChildren={<h2 className="title-stat">{title}</h2>}
            menu={menu}
          />
        ) : (
          <h2 className="title-stat">{title}</h2>
        )
      ) : (
        <>
          <h2 className="title-stat" style={{ paddingBottom: "20px" }}>
            {title}
          </h2>
          <DifferenceArea
            findField={findField || ""}
            count1={count1 || ""}
            count2={count2 || ""}
            x={x || ""}
            data={data as any}
            colors={colors}
          />
        </>
      )}
      {!withTab && !isAreaChart && <BodyCard data={data} />}
    </ChartWrapper>
  );
};

export default StatisticsCard;
