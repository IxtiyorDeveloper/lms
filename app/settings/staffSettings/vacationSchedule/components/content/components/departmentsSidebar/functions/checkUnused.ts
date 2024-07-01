import dayjs from "dayjs";
import { IUserObj, UserVacationHistory } from "types/staffSettings/vacation";
import { EVacationType } from "../type";
export const checkUnused = ({ vacations, currentMonth, user }: {
  vacations?: any,
  currentMonth: string;
  user: IUserObj;
}) => {
  if (!vacations[user.user_id]) {
    return false;
  } else {
    const allVacations = vacations[user.user_id]?.vacations;

    const sortVacations = allVacations?.sort((vac1: UserVacationHistory, vac2: UserVacationHistory)=> {
      // @ts-ignore
      return new Date(vac1.recommended_date) - new Date(vac2.recommended_date);
    })

    for (let a = 0; a < sortVacations.length; a++) {

      const vacationObj = sortVacations[a];
      const recommendedDate = dayjs(vacationObj.recommended_date);
      const fromDate = dayjs(vacationObj.from_date);
      const sameMonthWithRec = recommendedDate.isSame(fromDate, 'month');
      let isBetween = dayjs(currentMonth).isSame(recommendedDate) || (dayjs(currentMonth).isAfter(recommendedDate) && dayjs(currentMonth).isBefore(fromDate));
      const difference = fromDate.diff(recommendedDate, 'month');
      const isEarly = vacationObj.type == EVacationType.early;

      if (sameMonthWithRec || isEarly) {
        continue;
      }

      if (difference > 12) {
        const recommendedPeriodAdditional = recommendedDate.add(12, 'months');

        isBetween = dayjs(currentMonth).isSame(recommendedDate, 'months') ||
          (dayjs(currentMonth).isBefore(recommendedPeriodAdditional) && dayjs(currentMonth).isAfter(recommendedDate));
      }

      if (isBetween) {
        return true;
      }
    }

    return false;
  }
}
