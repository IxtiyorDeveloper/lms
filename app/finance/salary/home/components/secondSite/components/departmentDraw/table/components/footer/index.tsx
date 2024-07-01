import React from "react";
import { ComplexTotal, TableFooterWrapper } from "../../style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { DifferenceLastMonth } from "components";

export const Footer = ({
  data,
  total_salary,
  avans,
  tax,
  penalty,
  card,
  cash,
  total_difference,
}: {
  data: any;
  total_salary: any;
  avans: any;
  tax: any;
  penalty: any;
  card: any;
  cash: any;
  total_difference: number;
}) => {
  if (data?.assignments?.length > 1)
    return (
      <TableFooterWrapper>
        <div className="title">Total</div>
        <ComplexTotal>
          {toCurrencyFormat(total_salary)}
          <DifferenceLastMonth difference={total_difference} />
        </ComplexTotal>
        <div className="total"> {toCurrencyFormat(avans)}</div>
        <div className="total"> {toCurrencyFormat(tax)}</div>
        <div className="total"> {toCurrencyFormat(penalty)}</div>
        <div className="total"> {toCurrencyFormat(card)}</div>
        <div className="total"> {toCurrencyFormat(cash)}</div>
      </TableFooterWrapper>
    );
};
