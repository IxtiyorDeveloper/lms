import { EPotentialFailStaffType } from "types/potentialFail/potentialFailRequest";

export const menu = [
  {
    value: EPotentialFailStaffType.TEACHER?.toString(),
    label: "Teacher",
  },
  {
    value: EPotentialFailStaffType.SUPPORT?.toString(),
    label: "Support",
  },
];
