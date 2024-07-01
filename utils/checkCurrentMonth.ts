import moment from "moment";

export function checkIfCurrentMonth(structuredDate?: string) {
  if (structuredDate) {
    // Get the current date and format it as "YYYY-MM"
    const currentDate = moment().format("YYYY-MM");

    // Extract the year and month from the structured date
    const [year, month] = structuredDate.split("-");

    // Format the extracted year and month as "YYYY-MM"
    const formattedDate = moment(`${year}-${month}`).format("YYYY-MM");

    // Check if the formatted date matches the current date
    return formattedDate === currentDate;
  } else {
    return false;
  }
}

export function checkDateCurrentMonth(structuredDate?: Date | string) {
  if (structuredDate) {
    // Get the current date and format it as "YYYY-MM"
    const currentDate = moment().format("YYYY-MM");

    // Format the extracted year and month as "YYYY-MM"
    const formattedDate = moment(structuredDate).format("YYYY-MM");

    // Check if the formatted date matches the current date
    return formattedDate === currentDate;
  } else {
    return false;
  }
}
