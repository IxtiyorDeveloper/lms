import React, { ReactElement } from "react";
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
import moment from "moment";
import { useRouter } from "next/router";
import { bgColors } from "styles/theme";

interface IProps {
  color?: string;
  data?: any[];
  x: string;
  y: string;
  customTooltip?: boolean;
  customTooltipForDailyIncome?: (payload: any) => ReactElement;
  height?: string | number;
  margin?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
}

export const styles = {
  tooltip: {
    background: bgColors.dark,
    padding: "5px",
    border: "1px solid #00000040",
  },
};

export default function SingleAreaChart({
  color,
  x,
  y,
  data = [],
  customTooltip = false,
  customTooltipForDailyIncome,
  margin = {
    top: 20,
    right: 0,
    left: -10,
    bottom: 0,
  },
  height = 270,
}: IProps) {
  const router = useRouter();

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={margin}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey={x} stroke="" />
        <YAxis stroke="" tickFormatter={DataFormatter} />
        {!customTooltipForDailyIncome && customTooltip ? (
          <Tooltip
            content={(payload) => {
              return (
                <div style={styles.tooltip}>
                  <p>
                    {moment(
                      router.query?.from_date
                        ? router.query?.from_date
                        : new Date(),
                    ).format("MMMM")}
                    {"-"}
                    {payload?.label}
                  </p>
                  <p>
                    {/*// @ts-ignore*/}
                    {payload?.payload[0]?.name}: {payload?.payload[0]?.value}
                  </p>
                </div>
              );
            }}
          />
        ) : !customTooltipForDailyIncome ? (
          <Tooltip />
        ) : (
          <Tooltip
            content={(payload) => {
              return customTooltipForDailyIncome(payload);
            }}
          />
        )}
        <Area
          type="monotone"
          dataKey={y}
          stackId="1"
          stroke={color || "#6084FF"}
          fill={color || "#6084FF"}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
