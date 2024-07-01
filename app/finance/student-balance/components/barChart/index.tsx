import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { bgColors } from "styles/theme";
import { Wrapper } from "./style";
import { DataFormatter } from "utils/chartNumberFormatter";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

export default function BarChartE({ data }: any) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <p className="label blue">{`Balance: ${toCurrencyFormat(
            payload?.[0]?.payload?.balance,
          )}`}</p>
          <p className="label red">{`Spent: ${toCurrencyFormat(
            payload?.[1]?.payload?.balance_spent,
          )}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="custom-legend">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="legend-item">
            <span
              className="legend-color"
              style={{
                backgroundColor: entry.color,
                borderRadius: "50%",
                display: "inline-block",
                width: "10px",
                height: "10px",
                marginRight: "5px",
              }}
            ></span>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart barSize={25} data={data} margin={{ left: 16 }}>
          <CartesianGrid vertical={false} stroke="lightgray" />
          <XAxis axisLine={false} dataKey="name" />
          <YAxis
            stroke=""
            tickFormatter={DataFormatter}
            domain={[0, 100]}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={renderLegend}
            align="right"
            verticalAlign="top"
            margin={{
              bottom: 10,
            }}
          />
          <Bar
            dataKey="balance_spent"
            name="Balance spent"
            stackId="a"
            fill={bgColors.pepper}
          />
          <Bar
            dataKey="balance_calculated"
            name="Balance"
            stackId="a"
            fill={bgColors.kitten}
          />
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
