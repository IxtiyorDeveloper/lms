import React, { useMemo } from "react";
import { CardWrapper, TotalWrapper } from "../../style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import SimpleChart from "../../../incomeSimpleChart";
import { fixed } from "styles/theme";
import { useIncomeStatistics } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import { Educational, IIncomeStatistics } from "types";
import { Spin } from "antd";
import { calculateProductAmount } from "../../../../../../../finance/transactions/components/income/components/calculateProductAmount";

const RealTotal = () => {
  const router = useRouter();

  const currentYear = moment(new Date()).year();
  const currentMonth = moment(new Date()).format("MM");

  const { isLoading, data } = useIncomeStatistics({
    query_params: {
      year: router.query?.year || currentYear,
      month: router.query?.month || currentMonth,
      ...router.query,
    },
  });

  const getTotalByPart = (data?: Educational[]) => {
    return (
      data?.reduce((acc, cur) => {
        return acc + Number(cur?.amount);
      }, 0) ?? 0
    );
  };

  const getRealTotal = (dataAll?: IIncomeStatistics) => {
    const realTotal = dataAll?.realTotal;

    const educationalT = getTotalByPart(dataAll?.realTotal.educational);

    const product_and_service_t = calculateProductAmount({
      // @ts-ignore
      data: realTotal?.productAndService,
    });

    const student_balance =
      ((realTotal?.student_balance ?? 0) > 0
        ? realTotal?.student_balance
        : (realTotal?.student_balance ?? 0) * -1) ?? 0;

    return +educationalT + +product_and_service_t + +student_balance;
  };

  const stats = useMemo(() => {
    const educational =
      data?.realTotal?.educational?.reduce((acc, cur) => {
        return acc + Number(cur?.amount);
      }, 0) ?? 0;

    const product_and_service = calculateProductAmount({
      // @ts-ignore
      data: data?.realTotal?.productAndService,
    });

    const student_balance =
      ((data?.realTotal?.student_balance ?? 0) > 0
        ? data?.realTotal?.student_balance
        : (data?.realTotal?.student_balance ?? 0) * -1) ?? 0;

    const total = +educational + +product_and_service + +student_balance;

    return {
      educational: {
        // amount: educational - (data?.grossTotal?.returned_money ?? 0),
        amount: educational,
        educationalFields: data?.realTotal?.educational,
        percentage:
          total > 0 ? ((educational / total) * 100)?.toFixed(fixed) : 0,
      },
      product_and_service: {
        productAndServiceFields: data?.realTotal?.productAndService,
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

  return (
    <CardWrapper
      educational={+stats.educational.percentage ?? 0}
      productAndService={+stats.product_and_service.percentage ?? 0}
      studentBalance={+stats.student_balance.percentage ?? 0}
    >
      <Spin spinning={isLoading}>
        <h3 className="title-card">Real total</h3>
        <TotalWrapper>
          <p className="total-text">Total</p>
          <h2 className="real-total">{toCurrencyFormat(getRealTotal(data))}</h2>
        </TotalWrapper>
        <SimpleChart stats={stats as any} />
      </Spin>
    </CardWrapper>
  );
};

export default RealTotal;
