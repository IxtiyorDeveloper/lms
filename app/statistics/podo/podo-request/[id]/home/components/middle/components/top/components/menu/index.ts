import { EStaffType } from "types/statistics/podoRequest";

export const menu = [
  {
    value: EStaffType.TEACHER?.toString(),
    label: "Teacher",
  },
  {
    value: EStaffType.SUPPORT?.toString(),
    label: "Support",
  },
];
