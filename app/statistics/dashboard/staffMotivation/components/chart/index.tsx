import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    payload,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * -10;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={4} textAnchor="middle" fill={payload.color}>
        {payload.name}
        <br />
      </text>
      <text
        x={cx}
        y={cy}
        dy={24}
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
      {/*<path*/}
      {/*  d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}*/}
      {/*  stroke={payload.color}*/}
      {/*  fill="none"*/}
      {/*/>*/}
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
