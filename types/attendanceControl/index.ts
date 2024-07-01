import { IUser } from "../user";
import { TStatuses } from "../general";
import { TGroupType } from "../groupType";
import { ILessonDay } from "../lessonDay";
import { ILessonTime } from "../lessonTime";
import { IRoom } from "../rooms";

export interface IAttendanceControl {
  user_id: number;
  user: IUser;
  missed_count: number;
}

export interface IAttendanceControlAbsList {
  id: number;
  status: TStatuses;
  state: TStatuses;
  note: string;
  start_date: string;
  version_id: number;
  lesson_time_id: number;
  lesson_day_id: number;
  group_type_id: number;
  level_id: number;
  name: string;
  groupType: TGroupType;
  lessonDay: ILessonDay;
  lessonTime: ILessonTime;
  room: IRoom;
  abs_count: number;
}

export interface IMissedAttendance {
  group: {
    id: number;
    name: string;
    group_type: string;
    day: string;
    time: string;
    branch: string;
  };
  missed_count: 11;
}
