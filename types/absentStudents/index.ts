import { TStatuses } from "../general";
import { IUser } from "../user";
import { IGroup } from "../group";
import { IStudent } from "../student";
import { IUserProfile } from "types/userProfile";

export interface IAbsentStudents {
  id: number;
  status: TStatuses;
  user_id: number;
  group_id: number;
  start_date: string;
  added_date: string;
  finish_date: string;
  deleted_at: string;
  student_next_status: string;
  leaving_category_id: string;
  leaving_reason: string;
  added_by: string;
  user: IUser;
  group: IGroup;
  abs_count: number;
  absDates: IAbsDate[];
  student: IStudent;
}

export interface IRedListStatisticsTab {
  [key: string]: IRedListStatistics[];
}

export interface IRedListStatistics {
  avatar_url: string;
  avatar: any;
  full_name: string;
  red_list_student_count: string;
  user_id: string;
  type: string;
  phone: string;
}
export interface IAbsDate {
  status: TStatuses;
  date: string;
}

export interface IRedList {
  id: number;
  left_units_count: string;
  status: TStatuses;
  user_id: number;
  group_id: number;
  start_date: string;
  added_date: string;
  finish_date: string;
  deleted_at: string;
  student_next_status: string;
  leaving_category_id: string;
  leaving_reason: string;
  added_by: string;
  user: IUser;
  group: IGroup;
  abs_count: number;
  absDates: IAbsDate[];
  thisMonthAttendances: IAbsDate[];
  student: IStudent;
}

export interface IStudentRedListDay {
  id: number;
  opened: number;
  unit_id: number;
  opening_date: string;
  unit: IRedListUnit;
  student_units: IRedListStudentUnit[];
  student_unit: IRedListStudentUnit;
  child?: IStudentRedListDay;
}

export interface IRedListUnit {
  id: number;
  name: string;
  points: number;
  coins: number;
  order: number;
  system_order: number;
  level: IRedListLevel;
  parent_unit: IRedListUnit;
}

export interface IRedListLevel {
  id: number;
  name: string;
}

export interface IRedListStudentUnit {
  passed: number;
  opened: number;
  unit_id: number;
  is_populated: number;
  collected_points: number;
  total_points: number;
  collected_coins: number;
  total_coins: number;
  user_id: number;
}
export interface IAbsentStudentByMentor {
  abs_count: string;
  group: string;
  id: string;
  type: string;
  version_id: string;
  user_id: number;
  user: {
    balance: null;
    created_at: string;
    email: string;
    id: number;
    status: number;
    updated_at: string;
    username: string;
    userProfile: IUserProfile;
  };
}
