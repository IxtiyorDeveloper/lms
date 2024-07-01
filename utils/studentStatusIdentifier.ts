import { ETabStatuses, StudentStat, StudentType } from "../types";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
  statusLabels,
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRING_STUDENT,
} from "../constants/studentStatuses";
import { OneStudent } from "../types/student";

export const studentStatusIdentifier = (user: any) => {
  if (+user?.type == StudentType.TYPE_BANNED) {
    return "Banned";
  }

  if (
    user?.status === StudentStat.STUDENT_WAITING ||
    user?.status === StudentStat.STUDENT_ARCHIVED
  ) {
    const obj = {
      [StudentStat.STUDENT_WAITING]: "Waiting",
      [StudentStat.STUDENT_ARCHIVED]: "Archived",
    };
    return obj[user?.status as keyof typeof obj];
  } else {
    return statusLabels[
      (user?.currentGroupContact?.status as keyof typeof statusLabels) ||
        user?.status
    ];
  }
};

export const getStudentStatus = ({ user }: { user?: OneStudent }) => {
  if (
    user?.status === StudentStat.STUDENT_WAITING ||
    user?.status === StudentStat.STUDENT_ARCHIVED
  ) {
    if (user?.status === StudentStat.STUDENT_WAITING) {
      return ETabStatuses.TAB_WAITING;
    }
    if (user?.status === StudentStat.STUDENT_ARCHIVED) {
      return ETabStatuses.TAB_ARCHIVED;
    }
  } else {
    if (
      user?.currentGroupContact?.status?.toString() == NEW_STUDENT_NOT_ATTENDED
    ) {
      return ETabStatuses.TAB_NEW_STUDENT_NOT_ATTENDED;
    }
    if (user?.currentGroupContact?.status?.toString() == NEW_STUDENT_ATTENDED) {
      return ETabStatuses.TAB_NEW_STUDENT_ATTENDED;
    }
    if (user?.currentGroupContact?.status?.toString() == STUDYING_STUDENT) {
      return ETabStatuses.TAB_STUDYING;
    }
    if (user?.currentGroupContact?.status?.toString() == TRANSFERRING_STUDENT) {
      return ETabStatuses.TAB_TRANSFERRING;
    }
    if (user?.currentGroupContact?.status?.toString() == STOPPING_STUDENT) {
      return ETabStatuses.TAB_STOPPING;
    }
  }
};
