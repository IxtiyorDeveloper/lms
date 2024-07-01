import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRED_STUDENT,
  TRANSFERRING_STUDENT,
} from "./studentStatuses";
import { bgColors } from "styles/theme";
import { ETabStatuses } from "../types";

export const rowColorsForAcademic = {
  [NEW_STUDENT_NOT_ATTENDED]: bgColors.lemon,
  [NEW_STUDENT_ATTENDED]: bgColors.lemon,
  [STUDYING_STUDENT]: bgColors.transparent,
  [TRANSFERRING_STUDENT]: bgColors.transparent,
  [TRANSFERRED_STUDENT]: bgColors.whiteSmoke,
  [STOPPING_STUDENT]: bgColors.pale,
};
