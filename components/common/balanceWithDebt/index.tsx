import React from "react";
import { InnerWrapper, Left, NameFlex, Right, Wrapper } from "./style";
import { ChartSvg, WalletSvg } from "components";
import { bgColors } from "styles/theme";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const BalanceWithDebt = ({
  balance,
  addedBalance,
  debt,
}: {
  balance?: number | null;
  addedBalance?: number | null;
  debt?: number;
}) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Left>
          <NameFlex>
            <WalletSvg color={bgColors.blueGray} width={20} height={20} />
            <p className="title">Student balance</p>
          </NameFlex>
          <p className="sum">
            {toCurrencyFormat(+(balance || 0))}{" "}
            <sup>+{toCurrencyFormat(+(addedBalance || 0))}</sup>
          </p>
        </Left>
        <Right>
          <NameFlex>
            <ChartSvg color={bgColors.blueGray} />
            <p className="title">Total debt</p>
          </NameFlex>
          <p className="sum">{toCurrencyFormat(+(debt || 0))}</p>
        </Right>
      </InnerWrapper>
    </Wrapper>
  );
};

export default BalanceWithDebt;
