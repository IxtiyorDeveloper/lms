import React from "react";
import { Top, Wrapper, Text, Amount } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { generateType } from "./components/generateType";

const ProgressContent = ({ difference }: { difference: number }) => {
  const { type, text, icon } = generateType({ difference });

  return (
    <Wrapper>
      <Top>
        {icon}
        <Text>{text}</Text>
      </Top>
      <Amount className={type}>{toCurrencyFormat(difference)}</Amount>
    </Wrapper>
  );
};

export default ProgressContent;
