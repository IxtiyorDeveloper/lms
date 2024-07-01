import moment from "moment";
import { useMemo } from "react";

const endOfMonth = moment().endOf("month");
const month = endOfMonth.format("MMMM");
const day = endOfMonth.format("D");

export const days = Array.from(
  { length: +day - moment().date() + 1 },
  (_, index) => {
    const dayNumber = moment().date() + index;
    return {
      value: moment().format("YYYY-MM-") + dayNumber,
      label: `${dayNumber} ${month}`,
    };
  }
);

export const afterTodayDays = days.filter((day) =>
  moment(day.value).isAfter(moment())
);

export const afterTodayDaysValues = afterTodayDays.map((obj) => obj.value);
