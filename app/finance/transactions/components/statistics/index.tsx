import React, { useMemo } from "react";
import {
  StatsWrapper,
  HeadWrapper,
  StatsTableWrapper,
  TopIconWrapper,
  TableWrapper,
  Balance,
  Left,
  Right,
  Sum,
} from "./style";
import {
  BankGradientSvg,
  CoinsSvg,
  DifferenceSvg,
  ExpenseSvg,
  IncomeSvg,
  DollarSvg,
} from "components";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { bgColors, textColors } from "styles/theme";
import { useFinanceStatistics, usePageDataMemo } from "hooks";
import { useRouter } from "next/router";
import { Popover, Spin } from "antd";
import { XMoreInfoIcon } from "@jasurbekyuldashov/lms-web-icons";
import OnlineDetails from "./components/onlineDetails";
import { generateStats } from "./components/generateStats";
import { funcCheckPermission } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";
import OnlinePercentage from "./components/onlinePercentage";

const Statistics = () => {
  const router = useRouter();

  const { data, isLoading, isPreviousData } = useFinanceStatistics({
    query_params: {
      ...router?.query,
      from_date: router.query?.from_date,
      to_date: router.query?.to_date,
      income_id: undefined,
      paymentIncomeCheck: undefined,
      fields: "onlinePaymentPercent",
    },
  });

  const selects = usePageDataMemo();

  const stats = useMemo(() => {
    return generateStats({ data, selects });
  }, [selects, data]);

  const overallSum =
    +stats.motIncome +
    +stats.bankCash +
    +stats.bankCard +
    +stats.bankOnlinePayment;

  const isOverallVisible = funcCheckPermission([
    COMPONENTS_VIEWS.can_view_payment_statistics,
  ]);

  return (
    <StatsWrapper>
      <Spin spinning={isLoading || isPreviousData}>
        <HeadWrapper>
          <h3>Statistics</h3>
          {isOverallVisible && (
            <Sum>
              <div>{toCurrencyFormat(overallSum as number) ?? 0}</div>
              <div className="dollar">
                <DollarSvg width={6} height={10} />
              </div>
            </Sum>
          )}
        </HeadWrapper>
        <StatsTableWrapper>
          <TableWrapper width={65}>
            <TopIconWrapper>
              <CoinsSvg width={50} height={50} />
              <p>MOT</p>
            </TopIconWrapper>
            <Balance>
              <p className="sum grotesk">{toCurrencyFormat(stats.motIncome)}</p>
            </Balance>
            <div className="borderWrap">
              <table className="fTable">
                <tbody>
                  <tr>
                    <td>
                      <div className="withIcon">
                        <IncomeSvg
                          width={17}
                          height={17}
                          color={bgColors.midori}
                        />
                        INCOME
                      </div>
                    </td>
                    <td className="cashTextStyle cash">
                      <span className="number">
                        {toCurrencyFormat(stats.motIncome)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="withIcon">
                        <ExpenseSvg
                          width={17}
                          height={17}
                          color={bgColors.pop}
                        />
                        EXPENSE
                      </div>
                    </td>
                    <td className="redTextStyle cash">
                      <span className="number">
                        {toCurrencyFormat(stats.motExpense)}
                      </span>
                    </td>
                  </tr>
                  <tr className="bgLastOne">
                    <td>
                      <div className="withIcon">
                        <DifferenceSvg /> DIFFERENCE
                      </div>
                    </td>
                    <td className="blueText cash">
                      <span className="number">
                        {toCurrencyFormat(
                          +(stats.motIncome ?? 0) - +(stats.motExpense ?? 0)
                        )}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TableWrapper>
          <TableWrapper width={100}>
            <TopIconWrapper>
              <BankGradientSvg width={50} height={50} />
              <p>Bank</p>
            </TopIconWrapper>
            <Balance>
              <p className="sum grotesk">
                {toCurrencyFormat(
                  +stats.bankCash + +stats.bankCard + +stats.bankOnlinePayment
                )}
              </p>
            </Balance>
            <div className="borderWrap">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="withIcon">
                        <IncomeSvg
                          width={17}
                          height={17}
                          color={bgColors.midori}
                        />
                        INCOME
                      </div>
                    </td>
                    <td className="cash">
                      <span>Cash</span>
                      <br />
                      <span className="number">
                        {toCurrencyFormat(stats.bankCash)}
                      </span>
                    </td>
                    <td className="cash">
                      <span>Card</span>
                      <br />
                      <span className="number">
                        {toCurrencyFormat(stats.bankCard)}
                      </span>
                    </td>
                    <td className="cash">
                      <div className="online">
                        <Left>
                          <Popover
                            color={textColors.black}
                            content={OnlineDetails({ data })}
                            destroyTooltipOnHide
                          >
                            <XMoreInfoIcon color={bgColors.palomino} />
                          </Popover>
                          Online Payment
                        </Left>
                        <Right>
                          <OnlinePercentage />
                        </Right>
                      </div>
                      <br />
                      <span className="number">
                        {toCurrencyFormat(stats.bankOnlinePayment)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="withIcon">
                        <ExpenseSvg
                          width={17}
                          height={17}
                          color={bgColors.pop}
                        />
                        EXPENSE
                      </div>
                    </td>
                    <td colSpan={3} className="redTextStyle">
                      <span className="number">
                        {toCurrencyFormat(stats.bankExpense)}
                      </span>
                    </td>
                  </tr>
                  <tr className="bgLastOne">
                    <td>
                      <div className="withIcon">
                        <DifferenceSvg /> DIFFERENCE
                      </div>
                    </td>
                    <td colSpan={3} className="blueText">
                      <span className="number">
                        {toCurrencyFormat(
                          +stats.bankCash +
                            +stats.bankCard +
                            +stats.bankOnlinePayment -
                            +stats.bankExpense
                        )}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TableWrapper>
        </StatsTableWrapper>
      </Spin>
    </StatsWrapper>
  );
};

export default Statistics;
