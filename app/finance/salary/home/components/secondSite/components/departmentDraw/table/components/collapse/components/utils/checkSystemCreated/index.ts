import { IAggregated } from "types/finance/salary";
import { SalaryEnums } from "types";
import { ESalarySubTypes, SUB_TYPE_COVER_TEACHER } from "constants/salary";

export function checkSystemCreated({ item }: { item: IAggregated }) {
  if (
    item.type === SalaryEnums.CORRECTION &&
    item.sub_type?.toString() == SUB_TYPE_COVER_TEACHER
  ) {
    return true;
  }
  if (
    item.type === SalaryEnums.PENALTY &&
    item.sub_type?.toString() == ESalarySubTypes.KPI_OFFENCE?.toString()
  ) {
    return true;
  }
  return false;
}
