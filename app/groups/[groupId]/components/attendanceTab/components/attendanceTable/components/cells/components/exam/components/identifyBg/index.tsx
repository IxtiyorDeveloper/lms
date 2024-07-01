import { IExamProcess } from "types/exam/exam";
import { EXAM_PROCESS_STATUS } from "constants/exam";
import { bgColors, textColors } from "styles/theme";

export const identifyBg = ({
  process,
}: {
  process: IExamProcess | undefined;
}) => {
  if (process?.status == EXAM_PROCESS_STATUS.PASS) {
    return {
      bg: bgColors.midori,
      color: textColors.white,
    };
  }
  if (process?.status == EXAM_PROCESS_STATUS.FAIL) {
    return {
      bg: bgColors.pop,
      color: textColors.white,
    };
  }
  if (process?.status == EXAM_PROCESS_STATUS.CONDITIONAL) {
    return {
      bg: bgColors.primary,
      color: textColors.sceptreBlue,
    };
  }
  return {
    bg: bgColors.pop,
    color: textColors.white,
  };
};
