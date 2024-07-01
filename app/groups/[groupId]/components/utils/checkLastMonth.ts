import moment from "moment";
import { yearMonthGenerator } from "utils/yearMonthGenerator";

export const checkLastMonth = () => {
  const currentMonth = moment();

  const { month, year } = yearMonthGenerator();

  const diff = moment(`${year}-${month}`, "YYYY-MM").diff(
    currentMonth,
    "months"
  );
  return diff >= 0;
};
