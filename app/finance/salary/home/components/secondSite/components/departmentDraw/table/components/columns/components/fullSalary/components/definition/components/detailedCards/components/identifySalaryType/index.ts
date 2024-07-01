import { ESalaryRange } from "types/finance/salary";

export function identifySalaryType({
  range,
  total_salary,
}: {
  range: { min: number | null; max: number | null };
  total_salary: number;
}) {
  if (range.max == null || range.min == null) {
    return ESalaryRange.UNCLEAR;
  }
  if (total_salary >= range.min && total_salary <= range.max) {
    return ESalaryRange.NORMAL;
  } else {
    if (total_salary > range.max) {
      return ESalaryRange.HIGH;
    } else {
      return ESalaryRange.LOW;
    }
  }
}
