import React, { Fragment, useMemo } from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";
import { Wrapper } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { fixed } from "styles/theme";
import { dataGenerate, generateChartData } from "./utils";
import { ISalaryTotal } from "../../type";

const barColors = ["#8884d8", "#82ca9d", "#ffc658", "#FA791D"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Name: ${payload?.[0]?.payload?.name}`}</p>
        <p className="label">{`Total: ${(payload?.[0]?.value * 100).toFixed(
          fixed
        )}%`}</p>
      </div>
    );
  }
  return null;
};
export default function ChartFirst({ total }: { total: ISalaryTotal }) {
  const data = useMemo(() => {
    return dataGenerate({ total });
  }, [total]);

  const chartData = useMemo(() => {
    return generateChartData({ total });
  }, [total]);

  return (
    <Wrapper>
      <ul>
        <li>
          <div className="li-label">
            <div className="dot blue"></div>
            <span>Fixed</span>
          </div>
          <div>
            <p className="title-num">
              {toCurrencyFormat(total?.card_1?.fixed)}
            </p>
          </div>
        </li>
        <li>
          <div className="li-label">
            <div className="dot primary"></div>
            <span>KPI</span>
          </div>
          <div>
            <p className="title-num">{toCurrencyFormat(total?.card_1?.kpi)}</p>
          </div>
        </li>
        <li>
          <div className="li-label">
            <div className="dot midori"></div>
            <span>Bonus</span>
          </div>
          <div>
            <p className="title-num">
              {toCurrencyFormat(total?.card_1?.bonus)}
            </p>
          </div>
        </li>
        <li>
          <div className="li-label">
            <div className="dot yellow"></div>
            <span>Correction</span>
          </div>
          <div>
            <p className="title-num">
              {toCurrencyFormat(total?.card_1?.correction)}
            </p>
          </div>
        </li>
      </ul>
      <ResponsiveContainer width="50%" height={180}>
        <BarChart data={data}>
          <Tooltip content={<CustomTooltip />} />
          <Bar radius={8} dataKey="total" name="name">
            {chartData.map((entry, index) => (
              <Fragment key={index}>
                <Label value={`my_${index}`} position="inside" offset={-10} />
                <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
              </Fragment>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}
