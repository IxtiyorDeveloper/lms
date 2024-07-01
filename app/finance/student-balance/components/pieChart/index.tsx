import React, { useCallback, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Wrapper } from "./style";
import moment from "moment";
import { CustomTooltip } from "../../../shop/components/barchartV2/style";
import { bgColors } from "../../../../../styles/theme";
import { toCurrencyFormat } from "../../../../../utils/toCurrencyFormat";

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    payload,
    year,
  } = props;

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={payload.color}>
        Year
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill={payload.color}>
        {year || moment(new Date()).year()}
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
    </g>
  );
};

export default function Chart(props: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload) {
      return (
        <div
          style={{
            background: bgColors.dark,
            padding: "4px 8px",
            borderRadius: "8px",
          }}
          className="custom-tooltip"
        >
          <p className="label">{`${payload?.[0]?.payload?.name}: ${toCurrencyFormat(payload?.[0]?.payload?.value)}`}</p>
          <p className="label">
            {toCurrencyFormat(payload?.[0]?.payload?.amt)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Wrapper>
      <div className="overall-amount">
        <div className="dot" />
        <p className="title-label">Balance:</p>
        <p className="amount-label">
          {toCurrencyFormat(props?.overall_balance)}
        </p>
      </div>
      <div className="overall-amount">
        <div className="dot" />
        <p className="title-label">Balance spent:</p>
        <p className="amount-label">
          {toCurrencyFormat(props?.overall_balance_spent)}
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={props.data}
            cx={150}
            cy={130}
            innerRadius={85}
            outerRadius={110}
            dataKey="value"
            paddingAngle={1.2}
            onMouseEnter={onPieEnter}
          >
            {props.data?.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <Legend />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
