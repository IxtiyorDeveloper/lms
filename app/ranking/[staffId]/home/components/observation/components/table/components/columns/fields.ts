import { EObservationStaff } from "types/observation";

export const fields = {
  [EObservationStaff.teacher]: [
    "observer",
    "created_at",
    "teacher_and_support",
    "group_info",
    "score",
    "publish",
  ],
  [EObservationStaff.support]: [
    "observer",
    "created_at",
    "timetable_date",
    "students_timetable",
    "score",
    "publish",
  ],
};
