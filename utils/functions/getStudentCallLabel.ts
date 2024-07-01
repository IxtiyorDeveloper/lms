import {
  STUDENT_STATUS_STUDYING,
  StudentContactShortLabel,
  StudentStatusLabel,
} from "constants/studentStatuses";

export const getStudentCallLabel = (
  studentType: number,
  studentStatus: number | string,
  contactStatus: number
) => {
  if (studentType === 300) {
    return "Banned";
  }

  if (studentStatus != STUDENT_STATUS_STUDYING) {
    return StudentStatusLabel[studentStatus as keyof typeof StudentStatusLabel];
  }
  return StudentContactShortLabel[
    `${contactStatus}` as keyof typeof StudentContactShortLabel
  ];
};
