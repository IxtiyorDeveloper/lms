import { EStudentAttendance } from "types";
import { IAttendance } from "types/attendance";

export interface IReason {
  reason: string;
}

export interface Interface {
  value:
    | EStudentAttendance.ABS
    | EStudentAttendance.ADD
    | EStudentAttendance.CAME
    | EStudentAttendance.NOT_CAME
    | EStudentAttendance.STAR
    | EStudentAttendance.UNAVAILABLE
    | EStudentAttendance.WHITE;
  id?: string;
  attendance?: IAttendance;
  day: string;
}
