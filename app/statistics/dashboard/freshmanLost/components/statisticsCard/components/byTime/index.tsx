import React, { ReactNode } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { bgColors, textColors } from "styles/theme";

export default function ByTimeChart({
  data,
  barSize,
  barRadius,
  dataKey,
  color,
}: {
  data: { [key: string]: string | number }[];
  barSize?: number;
  barRadius?: number;
  dataKey?: string;
  color?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        width={500}
        height={300}
        data={data}
        barSize={barSize}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="time" stroke="" />
        <YAxis yAxisId="left" orientation="left" stroke="" />
        <Tooltip
          contentStyle={{
            backgroundColor: bgColors.sceptreBlue,
            color: textColors.white,
            borderRadius: "10px",
            border: "none",
          }}
        />
        <Bar
          radius={barRadius || 8}
          yAxisId={"left"}
          dataKey={dataKey || "lost"}
          fill={color || bgColors.deep}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
