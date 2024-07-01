import moment from "moment";

export function isDateInMonthAndYear({
  dateString,
  comparedMonth,
}: {
  dateString: moment.MomentInput;
  comparedMonth?: moment.MomentInput;
}) {
  // Parse the date string using Moment.js
  const targetDate = moment(dateString);

  // Parse the compared month using Moment.js
  const comparedMonthDate = comparedMonth
    ? moment(comparedMonth, "YYYY-MM")
    : moment();

  // Check if the target date is in the same month and year as the compared month
  return (
    targetDate.isSame(comparedMonthDate, "month") &&
    targetDate.isSame(comparedMonthDate, "year")
  );
}
