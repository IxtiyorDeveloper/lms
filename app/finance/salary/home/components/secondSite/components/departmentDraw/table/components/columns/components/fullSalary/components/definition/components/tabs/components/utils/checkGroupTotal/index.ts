import { ESalaryRange, ISalaryMain } from "types/finance/salary";
import { IGroup, IGroupCount, IRange } from "types";
import { GROUP_FORM_GROUP, GROUP_FORM_INDIVIDUAL } from "constants/groupForms";

export function checkRange({
  range,
  length,
}: {
  range?: IRange;
  length?: number;
}): any {
  if (range)
    return {
      min: (range?.min || 0) * (length || 0),
      max: (range?.max || 0) * (length || 0),
    };
  else {
    return {
      min: null,
      max: null,
    };
  }
}

export function identifyGroupTotal({
  range,
  total_amount,
}: {
  range: IRange | undefined;
  total_amount: number;
}) {
  if (range?.max == null || range.min == null) {
    return ESalaryRange.UNCLEAR;
  }
  if (total_amount >= range.min && total_amount <= range.max) {
    return ESalaryRange.NORMAL;
  } else {
    if (+total_amount > +range.max) {
      return ESalaryRange.HIGH;
    } else {
      return ESalaryRange.LOW;
    }
  }
}
