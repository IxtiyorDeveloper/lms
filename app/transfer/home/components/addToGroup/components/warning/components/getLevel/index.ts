import { findKeyInRange } from "utils/findKeyInRange";
import { restudyConfigNames } from "constants/settings/academic-settings/tools";
import { TParams } from "types";
import { IExamUser } from "types/exam/exam";
import { EStudentExamStatus } from "../../../../../../../../../constants";

export const getLevel = ({
  data,
  restudyConfigConstant,
}: {
  data?: IExamUser;
  restudyConfigConstant?: TParams;
}) => {
  const pass_point = data?.process?.pass_point ?? 0;
  const point = data?.process?.point ?? 0;
  const difference = pass_point - point;

  const key = findKeyInRange({
    data: restudyConfigConstant,
    point: difference,
  });

  const isFailed = data?.process?.status == EStudentExamStatus.RESULT_FAIL;

  return {
    level: key
      ? restudyConfigNames?.[key as keyof typeof restudyConfigConstant]
      : "No Level",
    isWarned: difference > 0 && isFailed,
  };
};
