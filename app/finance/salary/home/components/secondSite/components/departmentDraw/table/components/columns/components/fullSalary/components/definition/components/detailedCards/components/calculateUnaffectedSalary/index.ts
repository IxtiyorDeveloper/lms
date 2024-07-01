import { IActualSalary } from "types/finance/salary";
import { SalaryEnums } from "types";

export const calculateUnaffectedSalary = ({
  data,
}: {
  data: IActualSalary;
}) => {
  const fixedTotal = data?.aggregatedComponents?.reduce((acc, cur) => {
    if (cur.type == SalaryEnums.FIXED_SALARY) {
      return acc + +cur.value;
    } else return acc;
  }, 0);
  const kpiTotal = data?.aggregatedComponents?.reduce((acc, cur) => {
    if (cur.type == SalaryEnums.KPI) {
      return acc + +cur.value;
    } else return acc;
  }, 0);
  return fixedTotal + kpiTotal;
};
