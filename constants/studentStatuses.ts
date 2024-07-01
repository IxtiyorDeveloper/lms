import { ETabStatuses } from "../types";
import { bgColors, textColors } from "../styles/theme";

export const NEW_STUDENT_NOT_ATTENDED = "100";
export const NEW_STUDENT_ATTENDED = "200";
export const STUDYING_STUDENT = "300";
export const TRANSFERRING_STUDENT = "400";
export const TRANSFERRED_STUDENT = "500";
export const STOPPING_STUDENT = "600";
export const statuses = {
  [NEW_STUDENT_NOT_ATTENDED]: "New student not attended",
  [NEW_STUDENT_ATTENDED]: "New student attended",
  [STUDYING_STUDENT]: "Studying",
  [TRANSFERRING_STUDENT]: "Transferring",
  [TRANSFERRED_STUDENT]: "Transferred",
  [STOPPING_STUDENT]: "Stopping",
  unclear: "Unclear",
};

export const statusLabels = {
  [NEW_STUDENT_NOT_ATTENDED]: "Not attended",
  [NEW_STUDENT_ATTENDED]: "New student attended",
  [STUDYING_STUDENT]: "Studying",
  [TRANSFERRING_STUDENT]: "Transferring",
  [TRANSFERRED_STUDENT]: "Transferred",
  [STOPPING_STUDENT]: "Stopping",
  unclear: "Unclear",
};
/**
 * Transferred=>[
 * Studying
 * Transferring
 * Stopping
 * ]
 *
 *
 */

export const STUDENT_STATUS_WAITING_LIST = "100";
export const STUDENT_STATUS_STUDYING = "200";
export const STUDENT_STATUS_ARCHIVED = "300";

export const StudentStatusLabel = {
  [STUDENT_STATUS_WAITING_LIST]: "Waiting list",
  [STUDENT_STATUS_STUDYING]: "Grouped",
  [STUDENT_STATUS_ARCHIVED]: "Archived",
};

export const StudentContactShortLabel = {
  [NEW_STUDENT_NOT_ATTENDED]: "Not attended",
  [NEW_STUDENT_ATTENDED]: "Attended",
  [STUDYING_STUDENT]: "Studying",
  [TRANSFERRING_STUDENT]: "Transferring",
  [TRANSFERRED_STUDENT]: "Transferred",
  [STOPPING_STUDENT]: "Stopping",
};
export const statusOrder = [
  +STUDYING_STUDENT,
  +TRANSFERRING_STUDENT,
  +NEW_STUDENT_ATTENDED,
  +NEW_STUDENT_NOT_ATTENDED,
  +STOPPING_STUDENT,
  +TRANSFERRED_STUDENT,
];
export const studentMarkColors = {
  [ETabStatuses.TAB_WAITING]: bgColors.transparent,
  [ETabStatuses.TAB_NEW_STUDENT_NOT_ATTENDED]: bgColors.primary,
  [ETabStatuses.TAB_NEW_STUDENT_ATTENDED]: bgColors.primary,
  [ETabStatuses.TAB_STUDYING]: bgColors.midori,
  [ETabStatuses.TAB_TRANSFERRING]: bgColors.deep,
  [ETabStatuses.TAB_STOPPING]: bgColors.pop,
  [ETabStatuses.TAB_ARCHIVED]: bgColors.transparent,
};

export const studentColors = {
  [ETabStatuses.TAB_NEW_STUDENT_NOT_ATTENDED]: {
    backgroundColor: bgColors.anakiwa,
    color: textColors.deep,
    content: "Not attended",
  },
  [ETabStatuses.TAB_NEW_STUDENT_NOT_ATTENDED]: {
    backgroundColor: bgColors.anakiwa,
    color: textColors.deep,
    content: "Not attended",
  },
  [ETabStatuses.TAB_NEW_STUDENT_ATTENDED]: {
    backgroundColor: bgColors.kitten,
    color: textColors.white,
    content: "Attended",
  },
  [ETabStatuses.TAB_STUDYING]: {
    backgroundColor: bgColors.transparentGreen,
    color: textColors.midori,
    content: "Studying",
  },
  [ETabStatuses.TAB_TRANSFERRING]: {
    backgroundColor: bgColors.deep,
    color: textColors.white,
    content: "Transferring",
  },
  [ETabStatuses.TAB_STOPPING]: {
    backgroundColor: bgColors.pepper,
    color: textColors.white,
    content: "Stopping",
  },
  [ETabStatuses.TAB_ARCHIVED]: {
    backgroundColor: bgColors.nouveau,
    color: textColors.obscure,
    content: "Archived",
  },
  [ETabStatuses.TAB_WAITING]: {
    backgroundColor: bgColors.primary,
    color: textColors.black,

    content: "Waiting list",
  },
};
