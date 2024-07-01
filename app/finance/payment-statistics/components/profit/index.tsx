import React, { FC, useMemo } from "react";
import { CardWrapper, Wrapper } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import SimpleChart from "./simpleChart";
import { IPaymentStatistics } from "types/finance/paymentStatistics";
import { IncomeGroupedPaymentTypes, PaymentForms } from "types";
import { fixed } from "styles/theme";

interface Interface {
  data: IPaymentStatistics | undefined;
  salary: number;
}

const ThirdChild: FC<Interface> = ({ data, salary }) => {
  const info = useMemo(() => {
    let online_payment =
      data?.grossTotal?.paymentForm?.find(
        (f) =>
          f.payment_type?.toString() ==
          IncomeGroupedPaymentTypes.ONLINE_PAYMENT.toString()
      )?.amount ?? 0;
    let card =
      data?.grossTotal?.paymentForm?.find(
        (f) =>
          f.payment_type?.toString() ==
          IncomeGroupedPaymentTypes.CARD.toString()
      )?.amount ?? 0;
    let cash =
      data?.grossTotal?.paymentForm?.find(
        (f) =>
          f.payment_type?.toString() ==
          IncomeGroupedPaymentTypes.CASH.toString()
      )?.amount ?? 0;

    //expenses
    const expenseBank = +(
      data?.expense?.total?.find(
        (exp) => exp?.payment_form?.toString() == PaymentForms.BANK
      )?.amount ?? 0
    );
    const expenseMot = +(
      data?.expense?.total?.find(
        (exp) => exp?.payment_form?.toString() == PaymentForms.MOT
      )?.amount ?? 0
    );
    //incomes
    const incomeMot =
      data?.grossTotal?.paymentForm?.find(
        (f) =>
          f.payment_type?.toString() == IncomeGroupedPaymentTypes.MOT.toString()
      )?.amount ?? 0;

    const incomeBank = +online_payment + +card + +cash;
    // profits
    const profitBank = incomeBank - expenseBank;
    const profitMot = incomeMot - expenseMot;
    const totalProfit = profitBank + profitMot;
    const motPercentage = Number(
      ((profitMot / Math.abs(totalProfit)) * 100)?.toFixed(fixed)
    );
    const bankPercentage = Number(
      ((profitBank / Math.abs(totalProfit)) * 100)?.toFixed(fixed)
    );
    return {
      total: totalProfit,
      mot: {
        amount: profitMot,
        percentage:
          totalProfit > 0 ? (motPercentage > 100 ? 100 : motPercentage) : 0,
      },
      bank: {
        amount: profitBank,
        percentage:
          totalProfit > 0 ? (bankPercentage > 100 ? 100 : bankPercentage) : 0,
      },
    };
  }, [data]);

  return (
    <Wrapper>
      <div className="flex-wrap">
        <h2 className="title-card">Profit</h2>
        <p className="price-num grotesk">
          {toCurrencyFormat(+info.total - salary)
            .toString()
            .slice(0, -4)}{" "}
          <span className="grotesk">UZS</span>
        </p>
      </div>
      <div className="flex-cards">
        <CardWrapper
          first={info.mot?.percentage}
          second={info.bank?.percentage}
        >
          <h3 className="title-card">Total</h3>
          <SimpleChart info={info} />
        </CardWrapper>
      </div>
    </Wrapper>
  );
};

export default ThirdChild;
