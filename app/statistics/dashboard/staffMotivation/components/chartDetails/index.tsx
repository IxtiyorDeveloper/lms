import React, { FC } from "react";
import { Wrapper } from "./style";
import Chart from "../chart";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const ChartAndDetails: FC<{ data: any[] }> = ({ data }) => {
  return (
    <Wrapper>
      <Chart data={data} />
      <div className="details">
        <ul>
          {data
            .sort((a, b) => b?.percent - a?.percent)
            ?.map((d) => (
              <li>
                <div className="flex">
                  <div className="dot" style={{ background: d.color }}></div>
                  <div className="name">{d.name}</div>
                </div>
                <div className="numbers flex">
                  <p className="amount">{toCurrencyFormat(d.value)}</p>
                  <span className="percent">{d.percent.toFixed(2)}%</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </Wrapper>
  );
};

export default ChartAndDetails;
