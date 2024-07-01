import { IObjTimeTable } from "types";
import { OFFICE_HOURS } from "constants/support";
import { ButtonType } from "../type";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

export const specifyType = (obj: IObjTimeTable) => {
  if (obj.officeHour) {
    const inputDate = moment(obj.officeHour.date, DATE_FORMAT_YYYY_MM_DD);
    const currentDate = moment();
    const inputTime = obj.officeHour.time; // The time you want to compare
    const currentTime = moment();
    const inputTimeMoment = moment(inputTime, "HH:mm:ss");
    // Check if the input time is before the current time
    const isAfter = inputTimeMoment.isAfter(currentTime);

    if (
      inputDate.isAfter(currentDate, "day") ||
      (inputDate.isSame(currentDate, "day") && isAfter)
    ) {
      if (
        obj.officeHour.activeOfficeHourCandidates?.every(
          (item: any) => item.status === OFFICE_HOURS.CONFIRMED
        )
      )
        return ButtonType.ACCEPTED;
      else return ButtonType.WAITING;
    } else return ButtonType.DISABLED;
  }
};
