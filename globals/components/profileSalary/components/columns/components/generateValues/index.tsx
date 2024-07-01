import { generateCols } from "../generateCols";
import { IActualSalary } from "types/finance/salary";

export const generateValues = ({
  actualSalary,
}: {
  actualSalary: IActualSalary;
}) => {
  const { fixed, kpi, bonus, correction, penalty, tax } = generateCols({
    actualSalary,
  });
  const prepayment = actualSalary?.prepayments;

  const kpi_value = kpi.reduce((acc, cur) => acc + Number(cur.value), 0) || 0;
  const bonus_value =
    bonus.reduce((acc, cur) => acc + Number(cur.value), 0) || 0;
  const penalty_value =
    penalty.reduce((acc, cur) => acc + Number(cur.value), 0) || 0;
  const tax_value = tax.reduce((acc, cur) => acc + Number(cur.value), 0) || 0;
  const correction_value =
    correction.reduce((acc, cur) => acc + Number(cur.value), 0) || 0;
  const fixed_value =
    fixed.reduce((acc, cur) => acc + Number(cur.value), 0) || 0;
  const prepayment_value =
    prepayment?.reduce((acc, cur) => acc + Number(cur.amount), 0) || 0;
  return {
    kpi_value,
    bonus_value,
    penalty_value,
    tax_value,
    correction_value,
    fixed_value,
    prepayment_value,
    prepayment,
  };
};
