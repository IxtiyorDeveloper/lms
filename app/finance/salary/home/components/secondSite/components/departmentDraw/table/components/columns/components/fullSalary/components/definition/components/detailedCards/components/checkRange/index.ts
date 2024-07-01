import { ISalaryMain, RoleKey } from "types/finance/salary";
import { IGroupCount } from "types";
import { GROUP_FORM_GROUP, GROUP_FORM_INDIVIDUAL } from "constants/groupForms";

export function checkRange({
  data,
  months,
  groupCount,
}: {
  data: ISalaryMain;
  months: number;
  groupCount: IGroupCount;
}) {
  const min_maxes = data?.config?.extra?.min_maxes;

  const group_min_maxes =
    data?.config?.extra?.teacher_min_maxes?.[GROUP_FORM_GROUP];

  const ind_min_maxes =
    data?.config?.extra?.teacher_min_maxes?.[GROUP_FORM_INDIVIDUAL];

  if (data?.role?.key !== RoleKey.Teacher) {
    if (min_maxes)
      for (let i = 0; i < min_maxes.length; i++) {
        if (months >= min_maxes[i].from && months <= min_maxes[i].to) {
          return {
            min: min_maxes[i].min,
            max: min_maxes[i].max,
          };
        }
      }
    return {
      min: null,
      max: null,
    };
  } else {
    let group = {
      min: 0,
      max: 0,
    };
    let ind = {
      min: 0,
      max: 0,
    };
    if (group_min_maxes || ind_min_maxes) {
      if (groupCount?.group) {
        if (group_min_maxes)
          for (let i = 0; i < group_min_maxes.length; i++) {
            if (
              months >= group_min_maxes[i].from &&
              months <= group_min_maxes[i].to
            ) {
              group = {
                min: +group_min_maxes[i].min * +groupCount.group,
                max: +group_min_maxes[i].max * +groupCount.group,
              };
            }
          }
      }
      if (groupCount?.individual) {
        if (ind_min_maxes)
          for (let i = 0; i < ind_min_maxes.length; i++) {
            if (
              months >= ind_min_maxes[i].from &&
              months <= ind_min_maxes[i].to
            ) {
              ind = {
                min: +ind_min_maxes[i].min * +groupCount.individual,
                max: +ind_min_maxes[i].max * +groupCount.individual,
              };
            }
          }
      }
      return {
        min: group.min + ind.min,
        max: group.max + ind.max,
      };
    } else {
      return {
        min: null,
        max: null,
      };
    }
  }
}
