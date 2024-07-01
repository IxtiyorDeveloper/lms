import moment from "moment/moment";

export const checkNotRecommended = (
  {monthKeyWithYear, hiredDate, nextRecommendedDate}:
    { monthKeyWithYear: string; hiredDate: string; nextRecommendedDate: string}
) => {
  const firstHiredYearOfExperience = moment(monthKeyWithYear, "YYYY-MM").isBetween(moment(hiredDate).format("YYYY-MM"), moment(moment(hiredDate).format("YYYY-MM")).add(1, "years"));
  const toNextRecommendedPeriod = moment(monthKeyWithYear, "YYYY-MM").isBefore(moment(nextRecommendedDate));
  return firstHiredYearOfExperience || toNextRecommendedPeriod;
}
