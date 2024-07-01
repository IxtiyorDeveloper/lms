import moment from "moment";

export function calculateMonthDifference({
  dateString,
  comparedDate,
}: {
  dateString: moment.MomentInput;
  comparedDate?: moment.MomentInput;
}) {
  if (comparedDate) {
    // Convert the provided date string to a Moment.js object
    const providedDate = moment(dateString);

    // Current date
    const currentDate = moment(comparedDate);

    // Calculate the month difference
    return currentDate.diff(providedDate, "months");
  } else {
    // Convert the provided date string to a Moment.js object
    const providedDate = moment(dateString);

    // Current date
    const currentDate = moment();

    // Calculate the month difference
    return currentDate.diff(providedDate, "months");
  }
}
