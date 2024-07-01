import { IWorkingPeriod } from "types";
import moment, { Moment } from "moment";

export const checkIsWorking = ({
  working_periods,
  checked_date,
  hiderDate,
}: {
  working_periods?: IWorkingPeriod[];
  checked_date: Moment;
  hiderDate: Moment;
}) => {
  if (checked_date.isSameOrAfter(hiderDate, "month")) {
    return true;
  }

  return working_periods?.some((interval) => {
    const startDate = moment(interval.start_date);
    const endDate = interval.end_date ? moment(interval.end_date) : null;

    return !endDate
      ? checked_date.isSameOrAfter(startDate, "month")
      : checked_date.isSame(startDate, "month") ||
          checked_date.isBetween(startDate, endDate, "month");
  });
};
