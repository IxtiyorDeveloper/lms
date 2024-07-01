import { IUser } from "./user";
import { IGroup } from "./group";

export interface ITeacherReplaceInfo {
  teacher: ITeacherReplaceInfoTeacher[];
  support: ITeacherReplaceInfoTeacher[];
  lessonWeeks: {
    id: number;
    week_day: number;
  }[];
  group: IGroup;
  lessonDays: string[];
  group_data: {
    branch_id: number;
    course_id: number;
    group_type_id: number;
    lesson_day_id: number;
    lesson_time_id: number;
    level_id: number;
    name: string;
    parent_level_id: number;
    room_id: number;
  };
}

export interface ITeacherReplaceInfoTeacher {
  id: number;
  type: number;
  month: string;
  year: string;
  change_date: string;
  from_date: string;
  to_date: string;
  version_status: number;
  user: IUser;
}
