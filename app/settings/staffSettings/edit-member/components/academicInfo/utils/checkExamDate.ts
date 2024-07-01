import moment from "moment/moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

export const isDateAfter = ({ date, time }: { date: string; time: string }) => {
  const inputDate = moment(date, DATE_FORMAT_YYYY_MM_DD);
  const currentDate = moment();
  const inputTime = time; // The time you want to compare
  const currentTime = moment();
  const inputTimeMoment = moment(inputTime, "HH:mm:ss");
  const isAfter = inputTimeMoment.isAfter(currentTime);

  return (
    inputDate.isAfter(currentDate, "day") ||
    (inputDate.isSame(currentDate, "day") && isAfter)
  );
};
