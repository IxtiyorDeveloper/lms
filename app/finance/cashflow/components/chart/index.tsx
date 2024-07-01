import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } =
    props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        style={{ fontSize: 12 }}
        textAnchor="middle"
        fill={payload.color}
      >
        {payload.name}
      </text>
      <text
        x={cx}
        y={cy}
        dy={20}
        style={{ fontSize: 12 }}
        textAnchor="middle"
        fill={payload.color}
      >
        {toCurrencyFormat(payload.percent1)}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.color}
      />
    </g>
  );
};

export default function Chart(props: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChart width={600} height={500}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={props.data}
        cx={240}
        cy={200}
        innerRadius={100}
        outerRadius={130}
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
        {props.data.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
}
