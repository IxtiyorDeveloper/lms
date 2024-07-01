import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DataFormatter } from "utils/chartNumberFormatter";
import { ThroughSvg } from "components";
import { Wrapper } from "../systemCard/style";

export default function TotalCallsCard({
  color,
  x,
  y,
  data = [],
}: {
  color?: string;
  data?: any[];
  x: string;
  y: string;
}) {
  const exData = [
    {
      name: "Page A",
      uv: 100,
      pv: 2400,
      amt: "W1",
    },
    {
      name: "Page B",
      uv: 10,
      pv: 1398,
      amt: "W2",
    },
    {
      name: "Page C",
      uv: 40,
      pv: 9800,
      amt: "W3",
    },
    {
      name: "Page D",
      uv: 20,
      pv: 3908,
      amt: "W4",
    },
  ];

  return (
    <Wrapper>
      <div className="head-card start">
        <p className="title-card">
          Total calls <br /> 213
        </p>
        <ThroughSvg />
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart
          data={exData}
          margin={{
            top: 0,
            right: 15,
            left: -25,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis style={{ fontSize: "10px" }} dataKey={x} stroke="#ffffff50" />
          <YAxis
            style={{ fontSize: "10px" }}
            stroke="#ffffff50"
            tickFormatter={DataFormatter}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={y}
            stackId="1"
            stroke={color || "#6084FF"}
            fill={color || "#6084FF"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
