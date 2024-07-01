import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { bgColors, textColors } from "styles/theme";

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } =
    props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={14}
        style={{ fontWeight: 500 }}
        textAnchor="middle"
        className="grotesk"
        fill={textColors.sadet}
      >
        Total Task(s)
      </text>
      <text
        x={cx}
        y={cy}
        dy={-6}
        style={{ fontWeight: 700, fontSize: "20px" }}
        textAnchor="middle"
        fill={textColors.sceptreBlue}
      >
        {payload.total}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius + 1}
        outerRadius={outerRadius + 1}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
    </g>
  );
};

export default function RenderPieChart(props: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return !props.isDataAvailable() ? (
    <PieChart width={320} height={230}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={props.data}
        cx={160}
        cy={110}
        innerRadius={70}
        outerRadius={90}
        dataKey="number"
        onMouseEnter={onPieEnter}
      >
        {props?.data?.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  ) : (
    <PieChart width={320} height={230}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={[
          {
            status: "Opened",
            number: 1,
            total: 0,
            color: bgColors.whiteSmoke,
          },
        ]}
        cx={160}
        cy={110}
        innerRadius={70}
        outerRadius={90}
        dataKey="number"
        onMouseEnter={onPieEnter}
      >
        {props?.data?.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
}
