import React from "react";
import { Label, Right, Title, Value, Wrapper } from "./style";
import { IStatistics } from "./type";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const Top = ({ data }: IStatistics) => {
  const total = +(data?.total_debt || 0) + +(data?.total_balance || 0);
  return (
    <Wrapper>
      <Title>Statistics</Title>
      <Right>
        <Label>Potential total: </Label>
        <Value>{toCurrencyFormat(total)} </Value>
      </Right>
    </Wrapper>
  );
};

export default Top;
