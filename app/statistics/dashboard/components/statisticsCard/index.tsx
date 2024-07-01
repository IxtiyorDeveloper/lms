import React, { FC } from "react";
import { IStatisticsCard } from "./type";
import { ChartWrapper } from "./style";
import BodyCard from "./components/bodyCard";
import { ComplexThinTab, Segmented } from "components";
import DifferenceArea from "./components/differenceArea";
import TinyBar from "./components/tinyBar";
import { Spin } from "antd";

const StatisticsCard: FC<IStatisticsCard> = ({
  title,
  data,
  withTab = false,
  withTabGroup = false,
  menu,
  colors,
  isAreaChart,
  full,
  customToolTipForPieChart,
  isCustomTooltip,
  findField,
  count1,
  count2,
  routerKey,
  x,
  isTinyBar = false,
  reversedComplexThinTab = true,
  selectNode,
  initialTabValue,
  children,
  isLoading = false,
  containerStyle,
}) => {
  return (
    <ChartWrapper
      className={full ? "full" : ""}
      style={
        full ? { gridColumn: "auto", marginBottom: "20px" } : containerStyle
      }
    >
      <Spin spinning={isLoading}>
        {children ? (
          <>
            <div className="node">
              <h2 className="title-stat">{title}</h2>
              <div className="select">{selectNode}</div>
            </div>
            {children}
          </>
        ) : isAreaChart ? (
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
        ) : isTinyBar ? (
          <>
            <h2 className="title-stat" style={{ paddingBottom: "20px" }}>
              {title}
            </h2>
            <TinyBar data={data as any} />
          </>
        ) : withTab ? (
          <ComplexThinTab
            reversed={reversedComplexThinTab}
            topLeftChildren={<h2 className="title-stat">{title}</h2>}
            menu={menu}
            initValue={initialTabValue ?? 2}
          />
        ) : withTabGroup ? (
          <Segmented
            tabPlace="right"
            action={<h2 className="title-stat">{title}</h2>}
            options={menu}
            routerKey={routerKey}
            initValue={initialTabValue ?? 2}
          />
        ) : (
          <>
            <div className="node">
              <h2 className="title-stat">{title}</h2>
              <div className="select">{selectNode}</div>
            </div>
            <BodyCard
              customTooltip={customToolTipForPieChart}
              isCustomTooltip={isCustomTooltip}
              data={data}
            />
          </>
        )}
      </Spin>
    </ChartWrapper>
  );
};

export default StatisticsCard;
