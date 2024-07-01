import moment from "moment";

export function findNextAvailableDate(dateList: string[]): string {
  const today = moment().format("YYYY-MM-DD");

  // Check if today's date is in the list
  if (dateList.includes(today)) {
    return today;
  }

  // Find the next available date after today
  const futureDates = dateList.filter((date) => moment(date).isAfter(today));

  if (futureDates.length > 0) {
    return futureDates[0];
  }

  // If no future dates are found, return tomorrow
  return moment(today).add(1, "days").format("YYYY-MM-DD");
}
