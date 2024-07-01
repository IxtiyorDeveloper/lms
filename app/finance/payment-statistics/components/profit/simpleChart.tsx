import React, { FC } from "react";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const SimpleChart: FC<{
  info: {
    total: number;
    mot: { amount: number; percentage: number };
    bank: { amount: number; percentage: number };
  };
}> = ({ info }) => {
  return (
    <div>
      <div className="bar-chart">
        <div className="bank-1">
          <p>{info.mot.percentage}%</p>
          <div className="bar"></div>
        </div>
        <div className="bank-2">
          <p>{info.bank.percentage}%</p>
          <div className="bar"></div>
        </div>
      </div>
      <ul>
        <li>
          <div className="li-label">
            <span>MOT</span>
            <div className="dot midori"></div>
            <p className="title-num">{toCurrencyFormat(info?.mot?.amount)}</p>
          </div>
          <div></div>
        </li>
        <li>
          <div className="li-label">
            <span>Bank</span>
            <div className="dot primary"></div>
            <p className="title-num">{toCurrencyFormat(info?.bank?.amount)}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SimpleChart;
