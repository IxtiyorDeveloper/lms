import { ClosingGroupReasons } from "globals/components/groupModal/type";

export const groupReasons = [
  {
    label: "Group will be replaced this month",
    value: ClosingGroupReasons.CLOSING_REASON_REPLACE_IN_THIS_MONTH,
  },
  {
    label: "Group will be replaced next month",
    value: ClosingGroupReasons.CLOSING_REASON_REPLACE_IN_NEXT_MONTH,
  },
  {
    label: "Group will not be replaced",
    value: ClosingGroupReasons.NO_REPLACE,
  },
];
