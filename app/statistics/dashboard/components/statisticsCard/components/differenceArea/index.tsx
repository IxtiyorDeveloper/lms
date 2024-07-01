import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import moment from "moment";
import { DataFormatter } from "utils/chartNumberFormatter";

interface IProps {
  x: string;
  count1: string;
  count2: string;
  findField: string;
  data: any[];
  colors: any;
}
const currentMonth = moment().endOf("month").format("DD");

export default function DifferenceArea({
  colors,
  x,
  count1,
  count2,
  findField,
  data,
}: IProps) {
  const array = useMemo<{ [key: string]: number }[]>(() => {
    const result: { [key: string]: number }[] = [];
    new Array(+currentMonth).fill(null).map((_, index) => {
      const a = data.find((e) => +e?.[findField] === index + 1);
      if (a) {
        result.push(a);
      } else {
        result.push({
          [x]: index + 1,
          [count1]: 0,
          [count2]: 0,
        });
      }
    });
    return result;
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        width={500}
        height={400}
        data={array}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey={x} stroke="" />
        <YAxis stroke="" tickFormatter={DataFormatter} />
        <Tooltip />
        <Legend verticalAlign="top" align="left" />
        <Area
          type="monotone"
          dataKey={count1}
          stackId="1"
          stroke={colors[0] || "#6084FF"}
          fill={colors[0] || "#6084FF"}
        />
        <Area
          type="monotone"
          dataKey={count2}
          stackId="1"
          stroke={colors[1] || "#F05B71"}
          fill={colors[1] || "#F05B71"}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
