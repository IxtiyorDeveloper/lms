import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell, Legend, Tooltip } from "recharts";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { textColors } from "../../../../../../../../styles/theme";

const renderActiveShape = (props: any) => {
  // const RADIAN = Math.PI / 180;
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } =
    props;
  // const sin = Math.sin(-RADIAN * midAngle);
  // const cos = Math.cos(-RADIAN * midAngle);
  // const sx = cx + (outerRadius + 10) * cos;
  // const sy = cy + (outerRadius + 10) * sin;
  // const mx = cx + (outerRadius + 30) * cos;
  // const my = cy + (outerRadius + 30) * sin;
  // const ex = mx + (cos >= 0 ? 1 : -1) * 10;
  // const ey = my;
  // const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={-6} textAnchor="middle" fill={textColors.yourShadow}>
        Total
      </text>
      <text
        x={cx}
        y={cy}
        dy={14}
        style={{ fontWeight: 500, fontSize: "14px" }}
        textAnchor="middle"
        className="grotesk"
        fill={textColors.dark}
      >
        {toCurrencyFormat(payload.total)
          .toString()
          .slice(0, toCurrencyFormat(payload.total).toString().length - 3)}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        cornerRadius={4}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
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
    [setActiveIndex],
  );

  return (
    <PieChart width={320} height={300}>
      <Pie
        paddingAngle={1}
        activeIndex={activeIndex}
        data={props.data}
        cx={props?.cx ?? 140}
        cy={props?.cy ?? 160}
        innerRadius={props?.innerRadius ?? 65}
        outerRadius={props?.outerRadius ?? 90}
        dataKey="value"
        cornerRadius={4}
        onMouseEnter={onPieEnter}
        activeShape={renderActiveShape}
      >
        {props?.data?.map((entry: any, index: number) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
