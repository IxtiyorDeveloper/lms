import React, { useCallback, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import renderActiveShape from "./renderActiveShape";
import { IProps } from "./type";

function CustomPieChart(props: IProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChart width={props?.width ?? 285} height={props?.height ?? 300}>
      <Pie
        activeIndex={activeIndex}
        activeShape={(e: any) =>
          renderActiveShape({
            ...e,
            isSectorVisible: props.isSectorVisible,
          })
        }
        data={props.data}
        cx={props?.cx ?? 160}
        cy={props?.cy ?? 160}
        innerRadius={props?.innerRadius ?? 70}
        outerRadius={props?.outerRadius ?? 90}
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
        {props?.data?.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
}

CustomPieChart.defaultProps = {
  isSectorVisible: true,
};
export default CustomPieChart;
