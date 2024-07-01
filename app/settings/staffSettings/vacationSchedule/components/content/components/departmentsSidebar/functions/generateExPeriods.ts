import { Moment } from "moment";

export const generateExPeriods = (hiredDate: Moment, lastYear: string) => {
  const month = hiredDate.format("MM");
  const monthBefore = hiredDate.subtract(1, 'month').format("MM");
  const periods = [];

  for (let year = hiredDate.year(); year <= Number(lastYear); year++) {
    const from = `${year}-${month}`;
    const to = `${year + 1}-${monthBefore}`;

    periods.push({from, to});
  }

  return periods;
};
