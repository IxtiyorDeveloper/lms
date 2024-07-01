import moment, { MomentInput } from "moment";
import { DATE_FORMAT_YYYY_MM_DD } from "../constants/dates";

export function generateFullMonthFromMonthYear(
  dateString: MomentInput,
  permission: boolean
) {
  const currentDate = moment();
  const dynamicDate = moment(dateString, "MMMM YYYY");
  if (
    (dynamicDate.isSame(currentDate, "month") &&
      dynamicDate.isSame(currentDate, "year")) ||
    !permission
  ) {
    return null;
  }
  return dynamicDate.format(DATE_FORMAT_YYYY_MM_DD);
}
