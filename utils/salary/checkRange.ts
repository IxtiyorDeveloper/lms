import { ESalaryRange, ISalaryMain, SalaryType } from "types/finance/salary";
import { GROUP_FORM_GROUP, GROUP_FORM_INDIVIDUAL } from "constants/groupForms";
import { IRange } from "../../types";

export function checkRange({
  data,
  months,
  group_form,
}: {
  data: ISalaryMain;
  months: number;
  group_form: number;
}) {
  const group_min_maxes =
    data?.config?.extra?.teacher_min_maxes?.[GROUP_FORM_GROUP];
  const ind_min_maxes =
    data?.config?.extra?.teacher_min_maxes?.[GROUP_FORM_INDIVIDUAL];

  let group = {
    min: 0,
    max: 0,
  };
  let ind = {
    min: 0,
    max: 0,
  };
  if (group_min_maxes || ind_min_maxes) {
    if (group_min_maxes)
      for (let i = 0; i < group_min_maxes.length; i++) {
        if (
          months >= group_min_maxes[i].from &&
          months <= group_min_maxes[i].to
        ) {
          group = {
            min: +group_min_maxes[i].min,
            max: +group_min_maxes[i].max,
          };
        }
      }
    if (ind_min_maxes)
      for (let i = 0; i < ind_min_maxes.length; i++) {
        if (months >= ind_min_maxes[i].from && months <= ind_min_maxes[i].to) {
          ind = {
            min: +ind_min_maxes[i].min,
            max: +ind_min_maxes[i].max,
          };
        }
      }

    if (group_form == GROUP_FORM_GROUP) {
      return {
        min: group.min,
        max: group.max,
      };
    } else {
      return {
        min: ind.min,
        max: ind.max,
      };
    }
  } else {
    return {
      min: null,
      max: null,
    };
  }
}

export function identifySalaryType({
  range,
  total_salary,
}: {
  range: IRange | undefined;
  total_salary: number;
}) {
  if (range?.max == null || range.min == null) {
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
