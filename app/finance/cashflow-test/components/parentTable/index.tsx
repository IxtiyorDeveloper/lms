import React, { FC, useMemo } from "react";
import { IPropsCashFlow } from "../../index";
import { TH, Wrapper } from "./style";
import { generateParentTable } from "./utils";
import Row from "./components/row";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { PercentWrapper } from "../../../cashflow/style";

const ParentTable: FC<IPropsCashFlow> = ({ data, isLoading, total }) => {
  const a = useMemo(() => {
    return generateParentTable({ data });
  }, [data]);
  const getValue = (a: number, b: number) => {
    const value = (a * 100) / (b || 0);
    return isNaN(value) ? 0 : value.toFixed(2);
  };
  return (
    <Wrapper>
      {a.map((e) => {
        return (
          <table cellPadding={100} cellSpacing={200}>
            <thead>
              <tr className="main-header">
                <TH width={11}>
                  {" "}
                  <PercentWrapper color="blue">
                    {getValue(e.total, total)}%
                  </PercentWrapper>
                </TH>
                <TH width={30.5}>{e.category_name}</TH>
                <TH width={20}>{toCurrencyFormat(e.mot)}</TH>
                <TH width={20}>{toCurrencyFormat(e.bank)}</TH>
                <TH width={19} colSpan={2}>
                  {toCurrencyFormat(e.total)}
                </TH>
              </tr>
            </thead>
            <tbody>
              {e.children.map((i, index) => {
                return (
                  <Row item={i} index={index} color={e.color} total={e.total} />
                );
              })}
            </tbody>
          </table>
        );
      })}
    </Wrapper>
  );
};

export default ParentTable;
