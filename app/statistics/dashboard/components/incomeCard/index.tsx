import React, { FC } from "react";
import { ThroughSvg } from "components";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

interface IProps {
  today?: string;
  month?: string;
  data?: any;
  plusGreenNumber?: number;
  amountWhiteNumber?: number;
}

const IncomeCard: FC<IProps> = ({
  plusGreenNumber,
  amountWhiteNumber,
  data,
}) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload) {
      return (
        <div
          style={{
            background: bgColors.white,
            padding: "5px",
            borderRadius: "10px",
          }}
          className="custom-tooltip"
        >
          <p className="label">{`${payload?.[0]?.payload?.name}: ${payload?.[0]?.payload?.value}%`}</p>
          <p className="label">
            {toCurrencyFormat(payload?.[0]?.payload?.amt)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="head-card">
        <p className="title-card">Income</p>
        <ThroughSvg />
      </div>
      <div className="details">
        <p>+{toCurrencyFormat(plusGreenNumber)}</p>
        <p>{toCurrencyFormat(amountWhiteNumber)}</p>
      </div>
      <div className="chart-side">
        <ResponsiveContainer width="100%" height={120}>
          <PieChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
            <Tooltip content={CustomTooltip} />
            <Pie
              data={data}
              cx={80}
              cy={100}
              startAngle={180}
              endAngle={0}
              innerRadius={50}
              outerRadius={75}
              fill="#8884d8"
              paddingAngle={1}
              dataKey="value"
            >
              {data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: fontSizes.f10,
            padding: "0 6px 0 10px",
            left: 0,
            fontWeight: 600,
            bottom: "3px",
            position: "absolute",
            color: textColors.white,
            width: "85%",
          }}
        >
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </>
  );
};

export default IncomeCard;
