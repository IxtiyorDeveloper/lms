import { ESalaryRange } from "types/finance/salary";
import { IRange } from "types";

export const getDifference = ({
  type,
  range,
  unaffectedSalary,
}: {
  type: ESalaryRange;
  unaffectedSalary: number;
  range: IRange | undefined;
}) => {
  if (type == ESalaryRange.NORMAL) {
    return 0;
  }
  if (type == ESalaryRange.LOW) {
    return +unaffectedSalary - +(range?.min || 0);
  }
  if (type == ESalaryRange.HIGH) {
    return unaffectedSalary - +(range?.max || 0);
  }
  if (type == ESalaryRange.UNCLEAR) {
    return 0;
  }
};
