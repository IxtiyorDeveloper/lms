import React, { FC, useMemo } from "react";
import {
  BottomWrapper,
  Col,
  CWr,
  DetailedCol,
  DetailedOnline,
  Flex,
  Row,
} from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { bgColors, fixed } from "styles/theme";
import { Tooltip as AntToolTip } from "antd";
import { MoreInfoSvg } from "components";
import { EPayment, SubPaymentTypes } from "constants/payment";
import { IPaymentSubs } from "types/finance/statistics";

const BottomSide: FC<{
  info: {
    online_payment: {
      amount: number;
      percentage: string | number;
      subs?: IPaymentSubs[];
    };
    card: { amount: number; percentage: string | number };
    cash: { amount: number; percentage: string | number };
    mot: number;
    total: number;
    bank: number;
  };
}> = ({ info }) => {
  const data = useMemo(() => {
    return [
      {
        name: "Bank",
        value: Number(((info.bank / info.total) * 100).toFixed(fixed)),
      },
      {
        name: "MOT",
        value: Number(((info.mot / info.total) * 100).toFixed(fixed)),
      },
    ];
  }, [info]);
  const COLORS = [bgColors.midori, bgColors.pop];
  const toolTipData = [
    {
      name: "Card",
      type: EPayment.PAYMENT_CARD,
      amount: info?.card?.amount,
    },
    {
      name: "Cash",
      type: EPayment.PAYMENT_CASH,
      amount: info?.cash?.amount,
    },
    {
      name: "Online payment",
      type: EPayment.ONLINE_PAYMENT,
      amount: info?.online_payment?.amount,
      subs: info?.online_payment?.subs,
    },
  ];
  const content = (
    <CWr>
      <Row className="minWidth300">
        {toolTipData?.map((item, index) => {
          return (
            <Col key={index}>
              <p className="name">{item?.name}</p>
              <Flex>
                <div
                  className="dot"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <div className="price grotesk">
                  {toCurrencyFormat(item?.amount)}
                </div>
              </Flex>
              {item.type === EPayment.ONLINE_PAYMENT && (
                <DetailedOnline>
                  <ul>
                    {item?.subs
                      ?.sort((a, b) => +(b.amount || 0) - +(a.amount || 0))
                      ?.map((item, index) => {
                        return (
                          <li key={index}>
                            <DetailedCol>
                              <p className="name">
                                {
                                  SubPaymentTypes[
                                    item?.sub_payment_type as keyof typeof SubPaymentTypes
                                  ]?.label
                                }
                              </p>
                              <p className="price grotesk">
                                {toCurrencyFormat(+item?.amount)}
                              </p>
                            </DetailedCol>
                          </li>
                        );
                      })}
                  </ul>
                </DetailedOnline>
              )}
            </Col>
          );
        })}
      </Row>
    </CWr>
  );
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          {`${payload?.[0]?.name}: ${payload?.[0]?.value}`}%
        </div>
      );
    }
    return null;
  };
  return (
    <BottomWrapper>
      <div className="first">
        <div className="box bank">
          <div className="box-title">
            <p>Bank</p>
            <AntToolTip placement="topLeft" title={content}>
              <div className="icon">
                <MoreInfoSvg />
              </div>
            </AntToolTip>
          </div>
          <p className="box-number">{toCurrencyFormat(info?.bank)}</p>
        </div>
        <div className="box mot">
          <p className="box-title">MOT</p>
          <p className="box-number">{toCurrencyFormat(info?.mot)}</p>
        </div>
      </div>
      <div className="chart-side">
        <ResponsiveContainer width="50%" height={120}>
          <PieChart margin={{ top: 0, bottom: 0, left: 0, right: 0 }}>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx={100}
              cy={100}
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={1}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </BottomWrapper>
  );
};

export default BottomSide;
