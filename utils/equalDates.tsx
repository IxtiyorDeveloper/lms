import moment from "moment";

export function areDatesEqual(
  dateString1: string,
  dateString2: string
): boolean {
  const momentDate1 = moment(dateString1, ["YYYY-MM-DD", "DD MMM"], true);
  const momentDate2 = moment(dateString2, ["YYYY-MM-DD", "DD MMM"], true);

  // Compare the dates using Moment.js' isSame() method
  return (
    momentDate1.isValid() &&
    momentDate2.isValid() &&
    momentDate1.isSame(momentDate2, "day")
  );
}
export function isElementEqualToTarget(
  element: { children: string | any[] },
  text: string
): boolean {
  // Check if the element has one child element (div) and its text index is "Exam Dates"
  return (
    element?.children.length === 1 &&
    element?.children[0].tagName === "DIV" &&
    element?.children[0].textContent === text
  );
}
