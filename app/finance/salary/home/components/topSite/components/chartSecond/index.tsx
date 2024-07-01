import React, { Fragment, useMemo } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Label,
} from "recharts";
import { Wrapper } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { ISalaryTotal } from "../../type";

const ChartTest = ({ total }: { total: ISalaryTotal }) => {
  const data = useMemo(() => {
    return [
      {
        name: "Jan",
        total: total?.card_2?.avans?.[0]?.total,
        department: total?.card_2?.avans?.[0]?.department?.name,
        color: "blue",
      },
      {
        name: "Feb",
        total: total?.card_2?.avans?.[1]?.total,
        department: total?.card_2?.avans?.[1]?.department?.name,
        color: "midori",
      },
      {
        name: "Mar",
        total: total?.card_2?.avans?.[2]?.total,
        department: total?.card_2?.avans?.[2]?.department?.name,
        color: "primary",
      },
    ];
  }, [total]);

  const barColors = ["#8884d8", "#82ca9d", "#ffc658"];

  const chartData = useMemo(() => {
    return [
      {
        name: "Jan",
        total: total?.card_2?.avans?.[0]?.total,
        department: total?.card_2?.avans?.[0]?.department?.name,
      },
      {
        name: "Feb",
        total: total?.card_2?.avans?.[1]?.total,
        department: total?.card_2?.avans?.[1]?.department?.name,
      },
      {
        name: "Mar",
        total: total?.card_2?.avans?.[2]?.total,
        department: total?.card_2?.avans?.[2]?.department?.name,
      },
    ];
  }, [total]);
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Name: ${payload?.[0]?.payload?.department}`}</p>
          <p className="label">{`Total: ${toCurrencyFormat(
            payload[0]?.value
          )}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <Wrapper>
      <ul>
        {data?.map((item, key) => {
          return (
            <li key={key}>
              <div className="li-label">
                <div className={`dot ${item?.color}`}></div>
                <span>{item?.department}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <ResponsiveContainer width="100%" height={130}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 0, left: -60, bottom: -30 }}
        >
          <XAxis style={{ display: "none" }} type="number" />
          <YAxis style={{ display: "none" }} type="category" dataKey="name" />
          <CartesianGrid
            vertical={false}
            horizontal={false}
            strokeDasharray="3 3"
          />
          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="total" radius={8} fill="#82ca9d">
            {chartData.map((entry, index) => (
              <Fragment key={`${entry.name}_${index}`}>
                <Label value={`my_${index}`} position="inside" offset={-10} />
                <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
              </Fragment>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default ChartTest;
