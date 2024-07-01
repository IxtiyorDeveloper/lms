import React, { useMemo } from "react";
import { Amount, Box, Dot, Names, Title, Wrapper } from "./style";
import { bgColors } from "styles/theme";
import { IStatistics } from "./type";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const Boxes = ({ data }: IStatistics) => {
  const overall = useMemo(() => {
    return [
      {
        label: "Payed",
        amount: Number(data?.total_balance),
        bgColor: bgColors.serengeti,
        borderColor: bgColors.eucalyptus,
      },
      {
        label: "Total debtors",
        amount: Number(data?.total_debt),
        bgColor: bgColors.pepper,
        borderColor: bgColors.rose,
      },
    ];
  }, [data]);
  return (
    <Wrapper>
      {overall?.map((item, index) => {
        return (
          <Box key={index}>
            <Names>
              <Dot bgColor={item.bgColor} borderColor={item.borderColor} />
              <Title>{item.label}</Title>
            </Names>
            <Amount>{toCurrencyFormat(item.amount)}</Amount>
          </Box>
        );
      })}
    </Wrapper>
  );
};

export default Boxes;
