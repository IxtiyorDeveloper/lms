import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  LabelList,
  Cell,
  Tooltip,
} from "recharts";
import { bgColors, fontSizes, textColors } from "styles/theme";

const data = [
  {
    name: "Beginner",
    count: 4000,
    percent: 24,
    color: bgColors.midori,
  },
  {
    name: "Elementary",
    count: 3000,
    percent: 22,
    color: bgColors.deep,
  },
  {
    name: "Pre-Inter",
    count: 2000,
    percent: 22,
    color: bgColors.primary,
  },
  {
    name: "Intermediate",
    count: 2780,
    percent: 20,
    color: bgColors.orange,
  },
  {
    name: "Upper-Inter",
    count: 1890,
    percent: 21,
    color: bgColors.cornflower,
  },
  {
    name: "IELTS",
    count: 3000,
    percent: 25,
    color: bgColors.pop,
  },
];

export default function TinyBar() {
  const CustomLabel = (props: any) => {
    const { x, y, value } = props;
    return (
      <text
        x={x + 40}
        y={y + 30}
        dy={-10}
        className="grotesk"
        style={{
          fontWeight: 500,
          fontSize: fontSizes.f14,
        }}
        textAnchor="middle"
        fill={textColors.purpleCrystal}
      >
        {value}
      </text>
    );
  };

  return (
    <div>
      <p
        style={{
          fontWeight: 700,
          color: textColors.brotherBlue,
          fontSize: fontSizes.f24,
          borderBottom: `1px solid ${bgColors.whiteSmoke}`,
          marginBottom: `20px`,
        }}
        className="grotesk"
      >
        12364
      </p>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}
      >
        <ResponsiveContainer width="100%" height={250}>
          <BarChart width={150} height={200} data={data}>
            <Tooltip />
            <Bar radius={10} dataKey="count" fill="#b2b2b2">
              <LabelList dataKey="count" content={<CustomLabel />} />
              {data.map((bar, index) => {
                return <Cell key={`cell-${index}`} fill={bar?.color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            justifyContent: "space-between",
            margin: "7px",
          }}
        >
          {data.map((d) => (
            <li
              style={{
                position: "relative",
                width: "16.6667%",
                textAlign: "center",
                fontSize: fontSizes.f12,
                color: textColors.yourShadow,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  color: textColors.purpleCrystal,
                  fontSize: fontSizes.f14,
                  fontWeight: 500,
                  top: "-200%",
                  left: "38%",
                }}
                className="grotesk"
              >
                {d.percent}%
              </span>
              <span>{d.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
