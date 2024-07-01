import moment from "moment";
import Router from "next/router";

export function findClosestToZeroDate({
  data,
  lessonTime,
}: {
  data: { diff: number; day: string }[];
  lessonTime?: string;
}) {
  const currentDate = moment(Router.query?.date); // Create a Moment object using the date string
  const routerMonth = currentDate.month();
  const currentMonth = moment().month();
  if (lessonTime && routerMonth === currentMonth) {
    const currentTime = moment();

    // Create a moment object for the specified time (18:30:00)
    const specifiedTime = moment(lessonTime, "HH:mm:ss");

    // Compare the specified time with the current time
    const isAfter = specifiedTime.isAfter(currentTime);
    let closestNegativeDiff = -Infinity;
    let closestNegativeDate = null;

    for (let i = 0; i < data.length; i++) {
      const obj = data[i];
      const diff = obj.diff;

      if (diff === 0 && !isAfter) {
        return obj.day;
      }

      if (diff < 0 && diff > closestNegativeDiff) {
        closestNegativeDiff = diff;
        closestNegativeDate = obj.day;
      }
    }

    return closestNegativeDate;
  } else {
    return "";
  }
}
