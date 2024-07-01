import moment from "moment/moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { EAttendanceStatuses } from "types";
import { IAttendance } from "types/attendance";
import { IContacts } from "types/contact";

export const statusVerify = ({
  attendance,
  day,
  contacts,
  diff,
}: {
  attendance?: IAttendance;
  day: string;
  contacts?: IContacts[];
  diff: number;
}) => {
  if (contacts) {
    if (
      contacts.some((contact) => {
        return moment(day, DATE_FORMAT_YYYY_MM_DD).isBetween(
          contact?.actualPayment?.start_date,
          contact?.actualPayment?.finish_date,
          undefined,
          "[]"
        );
      })
    ) {
      if (!!attendance?.status) {
        return attendance?.status;
      } else {
        return diff <= 0 ? EAttendanceStatuses.ADD : EAttendanceStatuses.WHITE;
      }
    } else {
      return EAttendanceStatuses.UNAVAILABLE;
    }
  } else {
    return EAttendanceStatuses.UNAVAILABLE;
  }
};
