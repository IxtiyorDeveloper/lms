import React, { ReactElement, useCallback, useState } from "react";
import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { bgColors, textColors } from "styles/theme";

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } =
    props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={-6}
        textAnchor="middle"
        style={{ fontWeight: 400, fontSize: 12 }}
        fill={textColors.yourShadow}
      >
        Total
      </text>
      <text
        x={cx}
        y={cy}
        dy={14}
        style={{ fontWeight: 500, fontSize: 14 }}
        textAnchor="middle"
        className="grotesk"
      >
        {toCurrencyFormat(payload.total)
          .toString()
          .slice(0, toCurrencyFormat(payload.total).toString().length - 3)}
      </text>
      <Sector
        cx={cx}
        cornerRadius={4}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
    </g>
  );
};

interface IProps {
  data: any[];
  width?: number;
  height?: number;
  cx?: number;
  isSectorVisible?: boolean;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
  isCustomTooltip?: boolean;
  customTooltip?: (payload: any) => ReactElement;
}

export default function RenderPieChart(props: IProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  return (
    <PieChart width={props?.width ?? 255} height={props?.height ?? 300}>
      <Pie
        paddingAngle={1}
        activeIndex={activeIndex}
        activeShape={(e: any) =>
          renderActiveShape({
            ...e,
            isSectorVisible: props.isSectorVisible,
          })
        }
        data={props.data}
        cx={props?.cx ?? 140}
        cy={props?.cy ?? 160}
        innerRadius={props?.innerRadius ?? 65}
        outerRadius={props?.outerRadius ?? 90}
        dataKey="value"
        cornerRadius={4}
        startAngle={-270}
        endAngle={-630}
        onMouseEnter={onPieEnter}
      >
        {props?.data?.map((entry: any, index: number) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.color}
            style={{
              boxShadow: `inset red 0px 0px 5px`,
            }}
          />
        ))}
      </Pie>
      {props.isCustomTooltip ? (
        //   @ts-ignore
        <Tooltip content={(e) => props.customTooltip(e)} />
      ) : (
        <Tooltip
          contentStyle={{ background: bgColors.dark, zIndex: 9999999999 }}
          itemStyle={{ color: textColors.white, zIndex: 9999999999 }}
          useTranslate3d={true}
        />
      )}
    </PieChart>
  );
}

RenderPieChart.defaultProps = {
  isSectorVisible: true,
  isCustomTooltip: false,
};
