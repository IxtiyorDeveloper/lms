import React, { FC } from "react";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { Tooltip as AntToolTip } from "antd";

const SimpleChart: FC<{
  info: {
    online_payment: { amount: number; percentage: string | number };
    card: { amount: number; percentage: string | number };
    cash: { amount: number; percentage: string | number };
  };
}> = ({ info }) => {
  return (
    <div>
      <ul>
        <li>
          <div className="li-label">
            <div className="dot blue"></div>
            <span>Online payment</span>
          </div>
          <div>
            <p className="title-num grotesk">
              {toCurrencyFormat(+(info?.online_payment?.amount ?? 0))}
            </p>
          </div>
        </li>
        <li>
          <div className="li-label">
            <div className="dot primary"></div>
            <span>Card</span>
          </div>
          <div>
            <p className="title-num grotesk">
              {" "}
              {toCurrencyFormat(+(info?.card?.amount ?? 0))}
            </p>
          </div>
        </li>
        <li>
          <div className="li-label">
            <div className="dot midori"></div>
            <span>Cash</span>
          </div>
          <div>
            <p className="title-num grotesk">
              {" "}
              {toCurrencyFormat(+(info?.cash?.amount ?? 0))}
            </p>
          </div>
        </li>
      </ul>
      <div className="bar-chart">
        <div className="cash">
          {info?.cash?.percentage > 10 && <p>{info?.cash?.percentage}%</p>}
          <AntToolTip placement="top" title={<p>{info?.cash?.percentage}%</p>}>
            <div className="bar"></div>
          </AntToolTip>
        </div>
        <div className="card">
          {info?.card?.percentage > 10 && <p>{info?.card?.percentage}%</p>}
          <AntToolTip placement="top" title={<p>{info?.card?.percentage}%</p>}>
            <div className="bar"></div>
          </AntToolTip>
        </div>
        <div className="online-payment">
          {info?.online_payment?.percentage > 10 && (
            <p>{info?.online_payment?.percentage}%</p>
          )}
          <AntToolTip
            placement="top"
            title={<p>{info?.online_payment?.percentage}%</p>}
          >
            <div className="bar"></div>
          </AntToolTip>
        </div>
      </div>
    </div>
  );
};

export default SimpleChart;
