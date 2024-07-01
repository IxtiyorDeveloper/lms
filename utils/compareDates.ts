import moment from "moment";

export function compareDates({
  date1,
  date2,
}: {
  date1?: string;
  date2?: string;
}) {
  const endOfDay1 = moment(date1).endOf("day");
  const endOfDay2 = moment(date2).endOf("day");
  return endOfDay1.diff(endOfDay2, "day");
}
