import { IProgress, StudentProgressEnum } from "types/ars/teacher";
import { bgColors } from "styles/theme";

export enum MarkEnum {
  PASSED = "passed",
  NOT_PASSED = "not_passed",
  NOT_INFLUENCE = "not_influence",
}

const bgColorsForCell = {
  [MarkEnum.PASSED]: bgColors.midori,
  [MarkEnum.NOT_PASSED]: bgColors.pop,
  [MarkEnum.NOT_INFLUENCE]: bgColors.harrison,
};
export const identifyCellBgColor = ({ sc }: { sc: IProgress }) => {
  if (sc.status == StudentProgressEnum.COUNTABLE) {
    if (!!sc?.passed) {
      return bgColorsForCell[MarkEnum.PASSED];
    } else {
      return bgColorsForCell[MarkEnum.NOT_PASSED];
    }
  } else {
    return bgColorsForCell[MarkEnum.NOT_INFLUENCE];
  }
};
