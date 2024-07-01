import { ICoverTeacherComponent } from "types/finance/salary";
import moment from "moment";

export function removeDuplicatesByDate(arr: ICoverTeacherComponent[]) {
  const uniqueDates = new Set();
  return arr.filter((obj) => {
    const date = moment(obj.data.date).format("YYYY-MM-DD");
    if (uniqueDates.has(date)) {
      return false; // Duplicate found, exclude from the new array
    } else {
      uniqueDates.add(date); // Add the date to the Set for future checks
      return true; // Not a duplicate, include in the new array
    }
  });
}
