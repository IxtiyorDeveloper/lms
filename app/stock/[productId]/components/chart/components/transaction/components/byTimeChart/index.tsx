import React, { ReactElement, useEffect, useRef } from "react";
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
import { IStockProductStatistics } from "types";

export default function ByTimeChart({
  data,
  withLabel = false,
  color,
  barBorderRadius,
  barSize,
  isBrush = false,
  xAxisVertical = false,
  customTooltip,
}: {
  data: IStockProductStatistics[];
  withLabel?: boolean;
  color?: string;
  barBorderRadius?: number;
  barSize?: number;
  isBrush?: boolean;
  customTooltip?: (p: any) => ReactElement;
  xAxisVertical?: boolean;
}) {
  const brush = useRef(document.getElementsByClassName("recharts-brush")?.[0]);
  const d = useRef(
    document.getElementsByClassName("recharts-brush-slide")?.[0],
  );
  const e = useRef(
    document.getElementsByClassName(
      "recharts-layer recharts-brush-traveller",
    )?.[0],
  );

  useEffect(() => {
    brush.current = document.getElementsByClassName("recharts-brush")?.[0];

    d.current = document.getElementsByClassName("recharts-brush-slide")?.[0];
    e.current = document.getElementsByClassName(
      "recharts-layer recharts-brush-traveller",
    )?.[0];
    d.current?.setAttribute("fill-opacity", "1");
    d.current?.setAttribute("fill", bgColors.primary);
    // d.setAttribute("width", "200");
    d.current?.setAttribute("x", "55");

    const rect = brush.current?.getElementsByTagName("rect")?.[0];

    if (rect) {
      rect.setAttribute("stroke", bgColors.whiteSmoke);
      rect.setAttribute("strokeWidth", "1px");
      rect.setAttribute("fill", bgColors.whiteSmoke);
      rect.setAttribute("radius", "20px");
    }
  }, [barSize]);

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
            dataKey="label"
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
                    style={{ fontSize: 14 }}
                    // transform="rotate(-35)"
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
          <XAxis dataKey="label" stroke="" />
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
          dataKey="100.external"
          fill={bgColors.midori}
          stackId="a"
        />
        <Bar
          radius={barBorderRadius || 8}
          yAxisId="left"
          dataKey="100.internal"
          fill={bgColors.primary}
          stackId="a"
        />
        <Bar
          radius={barBorderRadius || 8}
          yAxisId="left"
          dataKey="200.external"
          fill={bgColors.royal}
          stackId="b"
        />
        <Bar
          radius={barBorderRadius || 8}
          yAxisId="left"
          dataKey="200.internal"
          fill={bgColors.pop}
          stackId="b"
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
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
