import { StudentStat } from "../types";
import { OneStudent } from "../types/student";

export const checkRegularStudent = (user: OneStudent | undefined) => {
  return user?.status === StudentStat.STUDENT_STUDYING;
};
