import moment from "moment";
import Router from "next/router";
import { DATE_FORMAT_YYYY_MM_DD } from "../constants/dates";

export function getYearDifference({
  dateTimeString,
  archivedDate,
}: {
  dateTimeString: any;
  archivedDate?: string;
}) {
  if (dateTimeString) {
    const formattedDateTimeString = convertToYYYYMM(dateTimeString);
    const currentDate = archivedDate
      ? moment(archivedDate, DATE_FORMAT_YYYY_MM_DD)
      : moment(Router.query.date || new Date(), "YYYY-MM");
    const passedDate = moment(formattedDateTimeString, "YYYY-MM");

    let years = currentDate.diff(passedDate, "years");
    let months = currentDate.diff(passedDate, "months");

    return {
      years,
      months: months + 1,
    };
  } else {
    return {
      years: 0,
      months: 0,
    };
  }
}

function convertToYYYYMM(dateTimeString: moment.MomentInput) {
  // Parse the input date string in the original format
  const originalDate = moment(dateTimeString, "YYYY-MM-DD HH:mm:ss");

  // Format the parsed date into the "YYYY-MM" format
  return originalDate.format("YYYY-MM");
}
