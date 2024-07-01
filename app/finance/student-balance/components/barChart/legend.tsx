import React from "react";
import { Legend } from "recharts";

interface CircleLegendProps {
  color: string;
  title: string;
}

const CircleLegend: React.FC<CircleLegendProps> = ({ color, title }) => {
  const renderLegend = (payload: any) => {
    const { value } = payload;
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <svg width={16} height={16}>
          <circle cx={8} cy={8} r={6} fill={color} />
        </svg>
        <span style={{ marginLeft: 5 }}>{value || title}</span>
      </div>
    );
  };

  return (
    <Legend
      align="left"
      verticalAlign="middle"
      layout="vertical"
      wrapperStyle={{ paddingLeft: 10 }}
      iconSize={16}
      formatter={renderLegend}
    />
  );
};

export default CircleLegend;
