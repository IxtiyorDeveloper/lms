import { IActualSalary, IAggregated } from "types/finance/salary";
import { SalaryEnums } from "types";

export const generateCols = ({
  actualSalary,
}: {
  actualSalary: IActualSalary;
}) => {
  const fixed: IAggregated[] = [];
  const kpi: IAggregated[] = [];
  const bonus: IAggregated[] = [];
  const correction: IAggregated[] = [];
  const penalty: IAggregated[] = [];
  const tax: IAggregated[] = [];
  actualSalary?.aggregatedComponents?.map((item) => {
    switch (item.type) {
      case SalaryEnums.FIXED_SALARY:
        return fixed.push(item);
      case SalaryEnums.KPI:
        return kpi.push(item);
      case SalaryEnums.BONUS:
        return bonus.push(item);
      case SalaryEnums.CORRECTION:
        return correction.push(item);
      case SalaryEnums.PENALTY:
        return penalty.push(item);
      case SalaryEnums.TAX:
        return tax.push(item);
    }
  });
  return {
    fixed,
    kpi,
    bonus,
    correction,
    penalty,
    tax,
  };
};
