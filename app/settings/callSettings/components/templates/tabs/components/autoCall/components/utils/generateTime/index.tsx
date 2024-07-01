import { weekdays } from "constants/weekdays";
import { TParams } from "types";
import { DATE_FORMAT_HH_mm } from "constants/dates";

export const generateTime = (time: TParams) => {
  let days: any = [];
  for (let i = 0; i < weekdays.length; i++) {
    const week_day = time[`day_${i}`];

    const time_from = !!time[`time_from_${week_day}`]
      ? time[`time_from_${week_day}`]?.format(DATE_FORMAT_HH_mm)
      : null;

    const time_to = !!time[`time_to_${week_day}`]
      ? time[`time_to_${week_day}`]?.format(DATE_FORMAT_HH_mm)
      : null;

    const status = time[`status_${week_day}`];

    if (status)
      days = [
        ...days,
        {
          time_to,
          week_day,
          time_from,
        },
      ];
  }
  return days;
};
