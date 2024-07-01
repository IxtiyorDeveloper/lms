import React, { FC } from "react";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const SimpleChart: FC<{
  stats: {
    total: number;
    bank: { amount: number; percentage: number };
    mot: { amount: number; percentage: number };
  };
}> = ({ stats }) => {
  return (
    <div>
      <div className="bar-chart">
        <div className="bank-1">
          <p className="grotesk">{stats.bank.percentage}%</p>
          <div className="bar"></div>
        </div>
        <div className="bank-2">
          <p className="grotesk">{stats.mot.percentage}%</p>
          <div className="bar"></div>
        </div>
      </div>
      <ul>
        <li>
          <div className="li-label">
            <span>Bank</span>
            <div className="dot midori"></div>
            <p className="title-num grotesk">
              {toCurrencyFormat(stats.bank.amount)}
            </p>
          </div>
        </li>
        <li>
          <div className="li-label">
            <span>MOT</span>
            <div className="dot primary"></div>
            <p className="title-num grotesk">
              {toCurrencyFormat(stats.mot.amount)}
            </p>
          </div>
          <div></div>
        </li>
      </ul>
    </div>
  );
};

export default SimpleChart;
