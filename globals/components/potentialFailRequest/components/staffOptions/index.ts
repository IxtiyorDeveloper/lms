import { EStaffType } from "types/statistics/podoRequest";

export const StaffOptions = [
  {
    label: "Teacher",
    value: EStaffType.TEACHER,
  },
  {
    label: "Support",
    value: EStaffType.SUPPORT,
  },
  {
    label: "Teacher and Support",
    value: EStaffType.TEACHER_AND_SUPPORT,
  },
];
