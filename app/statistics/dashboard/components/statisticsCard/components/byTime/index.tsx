import React, { ReactElement, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { bgColors, textColors } from "styles/theme";
import { DataFormatter } from "utils/chartNumberFormatter";
import { toCurrencyWithoutSum } from "utils/toCurrencyFormat";

export default function ByTimeChart({
  data,
  withLabel = false,
  withAvatar = false,
  color,
  barBorderRadius,
  barSize,
  isBrush = false,
  xAxisVertical = false,
  customTooltip,
}: {
  data: { time: string; lost: number; avatar?: string }[];
  withLabel?: boolean;
  withAvatar?: boolean;
  color?: string;
  barBorderRadius?: number;
  barSize?: number;
  isBrush?: boolean;
  customTooltip?: (p: any) => ReactElement;
  xAxisVertical?: boolean;
}) {
  const brush = document.getElementsByClassName("recharts-brush")?.[0];
  const d = document.getElementsByClassName("recharts-brush-slide")?.[0];
  const e = document.getElementsByClassName(
    "recharts-layer recharts-brush-traveller",
  )?.[0];

  useEffect(() => {
    if (d) {
      d.setAttribute("fill-opacity", "1");
      d.setAttribute("fill", bgColors.primary);
      // d.setAttribute("width", "200");
      d.setAttribute("x", "55");

      const rect = brush.getElementsByTagName("rect")?.[0];

      if (rect) {
        rect.setAttribute("stroke", bgColors.whiteSmoke);
        rect.setAttribute("strokeWidth", "1px");
        rect.setAttribute("fill", bgColors.whiteSmoke);
        rect.setAttribute("radius", "20px");
      }
    }
  }, [d, e, brush, barSize]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload) {
      return (
        <div
          style={{
            background: bgColors.sceptreBlue,
            borderRadius: "8px",
            padding: "8px 12px",
          }}
        >
          <p style={{ color: textColors.white }} className="label">
            {withLabel && label}{" "}
            {toCurrencyWithoutSum(payload?.[0]?.payload?.lost)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 40,
        }}
        barSize={barSize}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        {xAxisVertical ? (
          <XAxis
            dataKey="time"
            stroke=""
            angle={-90}
            tick={(e) => {
              const { x, y, payload } = e;

              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                    transform="rotate(-35)"
                  >
                    {payload.value}
                  </text>
                </g>
              );
            }}
            textAnchor="end"
            interval={0}
          />
        ) : (
          <XAxis dataKey="time" stroke="" />
        )}
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke=""
          tickFormatter={DataFormatter}
        />
        <Tooltip
          content={customTooltip ? customTooltip : <CustomTooltip />}
          contentStyle={{
            backgroundColor: bgColors.sceptreBlue,
            color: textColors.white,
            borderRadius: "10px",
            border: "none",
          }}
        />
        <Bar
          radius={barBorderRadius || 8}
          yAxisId="left"
          dataKey="lost"
          fill={color ?? bgColors.deep}
        />
        {isBrush && (
          <Brush
            y={xAxisVertical ? 230 : undefined}
            height={16}
            strokeWidth={0}
            startIndex={0}
            endIndex={data?.length > 40 ? 40 : data?.length - 1}
            floodColor="red"
            colorInterpolation="red"
            colorProfile="red"
            colorRendering="red"
            lightingColor="red"
            dataKey="asdasd"
          ></Brush>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
