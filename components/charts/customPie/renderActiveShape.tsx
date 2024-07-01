import { toCurrencyFormat } from "../../../utils/toCurrencyFormat";
import { Sector } from "recharts";
import React from "react";

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
  const ex = mx + (cos >= 0 ? 1 : -1);
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={-6} textAnchor="middle" fill={payload.color}>
        {payload.text}
      </text>
      <text
        x={cx}
        y={cy}
        dy={14}
        style={{ fontWeight: 700 }}
        textAnchor="middle"
        className="grotesk"
        fill={payload.color}
      >
        {payload.value}
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
      <path
        d={`M${sx},${sy}L${mx - 5},${my}L${ex - 5},${ey}`}
        stroke={payload.color}
        fill="none"
      />
      <text
        x={ex - 2}
        y={ey}
        dy={5}
        className="grotesk"
        style={{ fontSize: "11px" }}
        textAnchor={textAnchor}
        fill={payload.color}
      >
        {`${payload.percentage}%`}
      </text>
    </g>
  );
};
export default renderActiveShape;
