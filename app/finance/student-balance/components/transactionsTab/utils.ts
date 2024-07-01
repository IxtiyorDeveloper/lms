import moment from "moment";

export const getByMonthAdapter = (
  data: { month: string; income_balance: number; outcome_balance: number }[],
  key: "month" | "day",
) => {
  return data.map((obj) => ({
    ...obj,
    [key]: moment(
      obj[key as keyof typeof obj],
      key === "month" ? "YYYY-MM" : "YYYY-MM-DD",
    ).format(key === "month" ? "MMMM" : "DD MMM"),
  }));
};
