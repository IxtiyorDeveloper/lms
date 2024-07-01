export const TAB_WAITING = 100;
export const TAB_ARCHIVED = 200;
export const TAB_STUDYING = 300;
export const TAB_TRANSFERRING = 400;
export const TAB_STOPPING = 500;
export const TAB_NEW_STUDENT_ATTENDED = 600;
export const TAB_NEW_STUDENT_NOT_ATTENDED = 700;

export const GROUP = 100;
export const STUDENT = 200;
export const RETURN_MONEY_CURRENT_MONTH = 300;
export const RETURN_MONEY_OLD_MONTH = 400;
export const SPENT_BALANCE_CURRENT_MONTH = 500;
export const SPENT_BALANCE_OLD_MONTH = 600;

export const BALANCE_OUT_TYPE = {
  100: "Group",
  200: "Student",
  300: "Return money current month",
  400: "Return money old month",
  500: "Spent balance current month",
  600: "Spent balance old month",
};

export const GREEN_BALANCE = 100;
export const RED_BALANCE = 300;
export const YELLOW_BALANCE = 200;

export const studentBalanceOptions = [
  { label: "Green balance", value: "100" },
  { label: "Yellow balance", value: "200" },
  { label: "Red balance", value: "300" },
];

export const studentBalanceTypeOptions = [
  { label: "Return money current month", value: "300" },
  { label: "Return money old month", value: "400" },
  { label: "Spent balance current month", value: "500" },
  { label: "Spent balance old month", value: "600" },
];
