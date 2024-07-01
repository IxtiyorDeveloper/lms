import moment from "moment";

export const ToHourMinute = (a?: string) => {
  if (a) return a.replace(/:[^:]*$/, "");
  else return "";
};

export function minutesToHhmm(numberOfMinutes: number) {
  const duration = moment.duration(numberOfMinutes, "minutes");

  const hh =
    duration.years() * (365 * 24) +
    duration.months() * (30 * 24) +
    duration.days() * 24 +
    duration.hours();

  const mm = duration.minutes();

  return (
    (hh < 10 ? `0${hh}` : hh) + (mm !== 0 ? `:${mm < 10 ? `0${mm}` : mm}` : "")
  );
}

export const getTimeDifference = (deadline?: string) => {
  const now = moment();
  const endTime = moment(deadline);

  if (now.isAfter(endTime)) {
    return "0 hour 0 minute left";
  }

  const duration = moment.duration(endTime.diff(now));

  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  if (days) {
    return `${days} day ${hours} hour ${minutes} minute left`;
  } else {
    return `${hours} hour ${minutes} minute left`;
  }
};
