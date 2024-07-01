import { TAssignment } from "types";
import { ESalaryRange } from "types/finance/salary";

export const filterColumns = ({
  watchAll,
  sorted,
}: {
  watchAll: any;
  sorted?: TAssignment[];
}) => {
  const { increase, decrease, equal, high, low, normal, unclear } = watchAll;

  return sorted?.filter((cols) => {
    const isHigh = cols.amount_status === ESalaryRange.HIGH;
    const isNormal = cols.amount_status === ESalaryRange.NORMAL;
    const isLow = cols.amount_status === ESalaryRange.LOW;
    const isUnclear = cols.amount_status === ESalaryRange.UNCLEAR;

    const isIncrease = cols.difference_last_month_salary > 0;
    const isDecrease = cols.difference_last_month_salary < 0;
    const isEqual = cols.difference_last_month_salary == 0;

    if ((increase || decrease || equal) && (high || low || normal)) {
      return (
        ((increase && isIncrease) ||
          (decrease && isDecrease) ||
          (equal && isEqual)) &&
        ((high && isHigh) ||
          (normal && isNormal) ||
          (low && isLow) ||
          (unclear && isUnclear))
      );
    } else if (high || low || normal) {
      return (
        (high && isHigh) ||
        (normal && isNormal) ||
        (low && isLow) ||
        (unclear && isUnclear)
      );
    }
    return false;
  });
};
