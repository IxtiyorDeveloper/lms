import moment, { MomentInput } from "moment";

export function separateToYearMonth({
  dateString,
}: {
  dateString: MomentInput;
}) {
  const dynamicDate = moment(dateString, "MMMM YYYY");
  return {
    year: dynamicDate.format("YYYY"),
    month: dynamicDate.format("MM"),
  };
}
