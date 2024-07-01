import React, { FC, useMemo } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import { bgColors, fixed } from "styles/theme";
import { AntPanel, CardWrapper, FlexWrapper, HeadContent } from "./style";
import { Collapse } from "antd";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import SimpleChart from "./simpleChart";
import { IPaymentStatistics } from "types/finance/paymentStatistics";
import { IncomeGroupedPaymentTypes } from "types";
import { useRouter } from "next/router";

interface Interface {
  data: IPaymentStatistics | undefined;
}

const GrossTotal: FC<Interface> = ({ data }) => {
  const router = useRouter();
  const info = useMemo(() => {
    let online_payment =
      data?.grossTotal?.paymentForm?.find(
        (f) =>
          f.payment_type?.toString() ==
          IncomeGroupedPaymentTypes.ONLINE_PAYMENT.toString(),
      )?.amount ?? 0;
    let card =
      data?.grossTotal?.paymentForm?.find(
        (f) =>
          f.payment_type?.toString() ==
          IncomeGroupedPaymentTypes.CARD.toString(),
      )?.amount ?? 0;
    let cash =
      data?.grossTotal?.paymentForm?.find(
        (f) =>
          f.payment_type?.toString() ==
          IncomeGroupedPaymentTypes.CASH.toString(),
      )?.amount ?? 0;
    let grossTotal = data?.grossTotal?.total || 0;
    const total = +online_payment + +card + +cash;
    return {
      total: total,
      online_payment: {
        amount: online_payment,
        percentage:
          total > 0 ? ((online_payment / total) * 100)?.toFixed(fixed) : 0,
      },
      card: {
        amount: card,
        percentage: total > 0 ? ((card / total) * 100)?.toFixed(fixed) : 0,
      },
      cash: {
        amount: cash,
        percentage: total > 0 ? ((cash / total) * 100)?.toFixed(fixed) : 0,
      },
      mot:
        data?.grossTotal?.paymentForm?.find(
          (f) =>
            f.payment_type?.toString() ==
            IncomeGroupedPaymentTypes.MOT.toString(),
        )?.amount ?? 0,
      returned_money: data?.grossTotal?.returned_money,
      grossTotal,
    };
  }, [data]);

  return (
    <div>
      <Collapse
        bordered={false}
        accordion
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 270 : 90} />
        )}
        style={{
          background: bgColors.whiteSmoke,
          boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.04)",
        }}
        expandIconPosition="end"
        defaultActiveKey={!!router.query.isExpanded ? ["1"] : []}
      >
        <AntPanel
          key={"1"}
          header={
            <HeadContent>
              <p className="title-class">Gross total</p>
              <p className="total grotesk">
                {toCurrencyFormat(info.grossTotal).toString().slice(0, -4)}{" "}
                <span className="grotesk">UZS</span>
              </p>
            </HeadContent>
          }
        >
          <FlexWrapper>
            <CardWrapper
              cash={+info?.cash?.percentage ?? 0}
              card={+info?.card?.percentage ?? 0}
              onlinePayment={+info?.online_payment?.percentage ?? 0}
            >
              <h3 className="card-title">Bank</h3>
              <p className="card-price">{toCurrencyFormat(info?.total)}</p>
              <SimpleChart info={info} />
            </CardWrapper>
            <CardWrapper>
              <h3 className="card-title">MOT</h3>
              <p className="card-price">{toCurrencyFormat(info?.mot)}</p>
              <img className="img img1" src="/coins (1).png" alt="coins" />
            </CardWrapper>
            <CardWrapper>
              <h3 className="card-title">Returned money (Current month)</h3>
              <p className="card-price">
                {toCurrencyFormat(info?.returned_money)}
              </p>
              <img className="img" src="/money-envelope (1).png" alt="coins" />
            </CardWrapper>
          </FlexWrapper>
        </AntPanel>
      </Collapse>
    </div>
  );
};

export default GrossTotal;
