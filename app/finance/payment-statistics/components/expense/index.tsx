import React, { useMemo } from "react";
import { CardWrapper, Wrapper } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import SimpleChart from "./simpleChart";
import SecondChart from "./secondChart";
import { IPaymentStatistics } from "types/finance/paymentStatistics";
import { PaymentForms } from "types";
import { fixed } from "styles/theme";

interface Interface {
  data: IPaymentStatistics | undefined;
  salary: number;
}

const ThirdChild = ({ data, salary }: Interface) => {
  const stats = useMemo(() => {
    const bank = +(
      data?.expense?.total?.find(
        (exp) => exp?.payment_form?.toString() == PaymentForms.BANK
      )?.amount || 0
    );
    const mot = +(
      data?.expense?.total?.find(
        (exp) => exp?.payment_form?.toString() == PaymentForms.MOT
      )?.amount || 0
    );
    const total = bank + mot;
    let branches = data?.expense?.byBranches;
    let totalBranchExpense =
      branches?.reduce((acc, cur) => {
        return acc + (+cur?.amount || 0);
      }, 0) || 0;
    const branchPercentages = branches?.map((item) => ({
      name: item?.name,
      percentage:
        totalBranchExpense > 0
          ? ((+item?.amount / totalBranchExpense) * 100).toFixed(fixed)
          : 0,
    }));
    return {
      branchPercentages,
      total,
      withOutSalary: total + salary,
      bank: {
        amount: bank,
        percentage:
          total > 0 ? Number(((bank / total) * 100)?.toFixed(fixed)) : 0,
      },
      mot: {
        amount: mot,
        percentage:
          total > 0 ? Number(((mot / total) * 100)?.toFixed(fixed)) : 0,
      },
    };
  }, [data, salary]);

  return (
    <Wrapper>
      <div className="flex-wrap">
        <h2 className="title-card">Expense</h2>
        <div>
          {/*<p className="price-num grotesk">*/}
          {/*  {toCurrencyFormat(+stats.total).toString().slice(0, -4)}{" "}*/}
          {/*  <span className="grotesk">UZS</span>*/}
          {/*</p>*/}
          <p className="price-num grotesk">
            {toCurrencyFormat(+stats.withOutSalary).toString().slice(0, -4)}{" "}
            <span className="grotesk">UZS</span>
          </p>
        </div>
      </div>
      <div className="flex-cards">
        <CardWrapper
          first={stats.bank.percentage}
          second={stats.mot.percentage}
        >
          <h3 className="title-card">Total</h3>
          <SimpleChart stats={stats} />
        </CardWrapper>
        <SecondChart
          countVisibility={false}
          counts={[53, 20, 12]}
          stats={stats}
        />
      </div>
    </Wrapper>
  );
};

export default ThirdChild;
