import { SalaryEnums, SalarySubTypeEnums } from "types";
import { ESalarySubTypes, SUB_TYPE_CORRECTION } from "constants/salary";
import { IAggregated } from "types/finance/salary";

export const canDelete = ({
  obj,
  item,
  isGiven,
}: {
  obj: {
    labels: IAggregated[];
    num: number;
    title: string;
    type: SalaryEnums;
    sub_type: SalarySubTypeEnums;
  };
  item: IAggregated;
  isGiven: boolean;
}) => {
  const sub_type = item?.sub_type;
  if (isGiven) {
    return false;
  }
  if (
    obj.type === SalaryEnums.CORRECTION &&
    sub_type?.toString() === SUB_TYPE_CORRECTION.toString()
  ) {
    return true;
  }
  if (obj.type === SalaryEnums.BONUS && !sub_type) {
    return true;
  }
  if (obj.type === SalaryEnums.TAX) {
    return true;
  }
  if (
    obj.type === SalaryEnums.PENALTY &&
    sub_type?.toString() != ESalarySubTypes.KPI_OFFENCE?.toString()
  ) {
    return true;
  }
  return false;
};
