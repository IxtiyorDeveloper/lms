import { bgColors } from "styles/theme";
import { EStudentMatchType } from "types/student/waitingList";

export const waitingListTabs = [
  {
    title: "Fully match",
    type: EStudentMatchType.FULL,
    inactiveColor: bgColors.pearl,
    activeColor: bgColors.midori,
  },
  {
    title: "Partially match",
    type: EStudentMatchType.PARTIAL,
    inactiveColor: bgColors.daisy,
    activeColor: bgColors.primary,
  },
  {
    title: "No match",
    type: EStudentMatchType.NO_MATCH,
    inactiveColor: bgColors.sadet,
    activeColor: bgColors.soulfulBlue,
  },
];
