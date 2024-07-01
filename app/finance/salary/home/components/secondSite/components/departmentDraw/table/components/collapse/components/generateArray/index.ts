import { SalaryEnums, SalarySubTypeEnums } from "types";
import { IAggregated } from "types/finance/salary";

export const generateArray = ({
  fixed,
  kpi,
  bonus,
  tax,
  penalty,
  correction,
}: {
  fixed: IAggregated[];
  kpi: IAggregated[];
  bonus: IAggregated[];
  tax: IAggregated[];
  penalty: IAggregated[];
  correction: IAggregated[];
}) => {
  return [
    {
      labels: fixed,
      num: fixed?.length,
      title: "Fixed salary",
      type: SalaryEnums.FIXED_SALARY,
      sub_type: SalarySubTypeEnums.KPI_TEACHING_GROUP,
    },
    {
      labels: kpi,
      num: kpi?.length,
      title: "KPI",
      type: SalaryEnums.KPI,
      sub_type: SalarySubTypeEnums.KPI_TEACHING_GROUP,
    },
    {
      labels: bonus,
      num: bonus?.length,
      title: "Bonus",
      type: SalaryEnums.BONUS,
      sub_type: SalarySubTypeEnums.KPI_TEACHING_GROUP,
    },
    {
      labels: tax,
      num: tax?.length,
      title: "Tax",
      type: SalaryEnums.TAX,
      sub_type: SalarySubTypeEnums.SUB_TYPE_TAX,
    },
    {
      labels: penalty,
      num: penalty?.length,
      title: "Penalty",
      type: SalaryEnums.PENALTY,
      sub_type: SalarySubTypeEnums.SUB_TYPE_PENALTY,
    },
    {
      labels: correction,
      num: correction?.length,
      title: "Correction",
      type: SalaryEnums.CORRECTION,
      sub_type: SalarySubTypeEnums.SUB_TYPE_CORRECTION,
    },
  ];
};
