import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  LabelList,
  Cell,
  Tooltip,
} from "recharts";
import { bgColors, fontSizes, textColors } from "styles/theme";

interface IProps {
  data?: {
    count: number;
    percent: number;
    name: string;
    value: number;
    color: string;
    total?: number | undefined;
    location?: boolean | undefined;
    user?: { name: string; image: string } | undefined;
  }[];
}

export default function TinyBar({ data }: IProps) {
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

  const total = useMemo(() => {
    let result = 0;
    data?.map((e) => {
      result += +e.count;
    });

    return result;
  }, [data]);

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
        {total || 0}
      </p>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}
      >
        <ResponsiveContainer width="100%" height={250}>
          <BarChart width={150} height={200} data={data}>
            <Tooltip />
            <Bar radius={10} dataKey="count" fill="#b2b2b2">
              <LabelList dataKey="count" content={<CustomLabel />} />
              {data &&
                data.map((bar, index) => {
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
          {data &&
            data.map((d) => (
              <li
                style={{
                  position: "relative",
                  width: `${100 / data.length}%`,
                  textAlign: "center",
                  fontSize: fontSizes.f12,
                  color: textColors.yourShadow,
                }}
              >
                {/*{}*/}
                <span
                  style={{
                    position: "absolute",
                    color: textColors.purpleCrystal,
                    fontSize: fontSizes.f14,
                    fontWeight: 500,
                    top: "-200%",
                    left: "42%",
                  }}
                  className="grotesk"
                >
                  {((d.count * 100) / total).toFixed(0)}%
                </span>
                <span>{d.name}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
