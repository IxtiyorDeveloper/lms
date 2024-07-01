import React, { useMemo } from "react";
import { CardWrapper, Wrapper } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import BottomSide from "./bottomSide";
import { IPaymentStatistics } from "types/finance/paymentStatistics";
import { fixed } from "styles/theme";
import { IncomeGroupedPaymentTypes } from "types";
import { calculateProductAmount } from "../../../transactions/components/income/components/calculateProductAmount";
import SimpleChart from "./components/simpleChart";

const SecondChild = ({ data }: { data: IPaymentStatistics | undefined }) => {
  const stats = useMemo(() => {
    const educational =
      data?.total?.bySource?.educational?.reduce((acc, cur) => {
        return acc + Number(cur?.amount);
      }, 0) ?? 0;

    const product_and_service = calculateProductAmount({
      data: data?.total?.bySource?.productAndService,
    });

    const student_balance =
      ((data?.total?.bySource?.student_balance ?? 0) > 0
        ? data?.total?.bySource?.student_balance
        : (data?.total?.bySource?.student_balance ?? 0) * -1) ?? 0;

    const total = +educational + +product_and_service + +student_balance;

    return {
      educational: {
        // amount: educational - (data?.grossTotal?.returned_money ?? 0),
        amount: educational,
        educationalFields: data?.total?.bySource?.educational,
        percentage:
          total > 0 ? ((educational / total) * 100)?.toFixed(fixed) : 0,
      },
      product_and_service: {
        productAndServiceFields: data?.total?.bySource?.productAndService,
        amount: product_and_service,
        percentage:
          total > 0 ? ((product_and_service / total) * 100)?.toFixed(fixed) : 0,
      },
      student_balance: {
        amount: student_balance,
        percentage:
          total > 0 ? ((student_balance / total) * 100)?.toFixed(fixed) : 0,
      },
    };
  }, [data]);

  const info = useMemo(() => {
    let online_payment = data?.grossTotal?.paymentForm?.find(
      (f) =>
        f.payment_type?.toString() ==
        IncomeGroupedPaymentTypes.ONLINE_PAYMENT.toString(),
    );
    let online_payment_amount = online_payment?.amount ?? 0;
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
    let mot =
      data?.grossTotal?.paymentForm?.find(
        (f) =>
          f.payment_type?.toString() ==
          IncomeGroupedPaymentTypes.MOT.toString(),
      )?.amount ?? 0;
    const info_total = +online_payment_amount + +card + +cash;
    const totalMoney =
      (data?.grossTotal?.total || 0) - (data?.grossTotal?.returned_money || 0);
    return {
      online_payment: {
        amount: online_payment_amount,
        percentage:
          info_total > 0
            ? ((online_payment_amount / info_total) * 100)?.toFixed(fixed)
            : 0,
        subs: online_payment?.subs,
      },
      card: {
        amount: card,
        percentage:
          info_total > 0 ? ((card / info_total) * 100)?.toFixed(fixed) : 0,
      },
      cash: {
        amount: cash,
        percentage:
          info_total > 0 ? ((cash / info_total) * 100)?.toFixed(fixed) : 0,
      },
      mot: +mot,
      total: totalMoney,
      // withoutSalary: totalMoney - total,
      bank: +online_payment_amount + +card + +cash,
    };
  }, [data]);

  return (
    <Wrapper>
      <div className="flex-wrap">
        <h2 className="title-card">Total</h2>
        <div>
          <p className="price-num grotesk">
            {toCurrencyFormat(+info.total).toString().slice(0, -4)}{" "}
            <span className="grotesk">UZS</span>
          </p>
        </div>
      </div>
      <div className="flex-cards">
        <CardWrapper
          educational={+stats.educational.percentage ?? 0}
          productAndService={+stats.product_and_service.percentage ?? 0}
          studentBalance={+stats.student_balance.percentage ?? 0}
        >
          <h3 className="title-card">Sources</h3>
          <SimpleChart stats={stats} />
        </CardWrapper>
        <CardWrapper>
          <h3 className="title-card">Payment types</h3>
          <BottomSide info={info} />
        </CardWrapper>
      </div>
    </Wrapper>
  );
};

export default SecondChild;
