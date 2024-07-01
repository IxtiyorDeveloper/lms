import React, { FC, Fragment } from "react";
import { Wrapper } from "./style";
import Chart from "../chart";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { Empty } from "antd";

const ChartAndDetails: FC<{ data: any[] }> = ({ data }) => {
  return (
    <Wrapper>
      {data?.length ? (
        <div className="wrapper-chart">
          <Chart data={data} />
          <div className="details">
            <ul>
              {data
                .slice()
                .sort((a, b) => b?.percent - a?.percent)
                ?.map((d) => (
                  <li>
                    <div className="flex">
                      <div
                        className="dot"
                        style={{ background: d.color }}
                      ></div>
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
        </div>
      ) : (
        <div className="flex-center">
          <Empty />
        </div>
      )}
    </Wrapper>
  );
};

export default ChartAndDetails;
