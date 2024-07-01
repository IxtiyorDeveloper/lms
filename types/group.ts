import { TGroupType } from "./groupType";
import { IGroupMentor } from "./groupMentors";
import { ILevel } from "./level";
import { ICourse } from "./course";
import { ILessonDay } from "./lessonDay";
import { ILessonTime } from "./lessonTime";
import { IRoom } from "./rooms";
import { IContacts } from "./contact";
import { Gender, TStatuses } from "./general";
import { ClosingGroupReasons } from "globals/components/groupModal/type";
import { IUser } from "./user";

export interface IGroup {
  id: string;
  company_id: string;
  course_id: string;
  level_id: string;
  sub_level_id: string;
  group_type_id: string;
  lesson_day_id: string;
  lesson_time_id: string;
  room_id: string;
  closing_reason: ClosingGroupReasons;
  status: string;
  state: string;
  responsible?: IUser;
  note: string;
  start_date: string;
  balance: string;
  name: string;
  count?: number;
  deleted_at: null | string;
  version_id: string;
  lifetime_date: string;
  groupType: TGroupType;
  payment_count: number;
  full_month_stopping_student_count: number;
  free_place_with_active_students: number;
  custom_free_place: number;
  student_count: number;
  lifetime_status: EPaidGroupType;
  free_place: number;
  free_place_with_next_month: number;
  groupMentors?: IGroupMentor[];
  level?: ILevel;
  featureLevel?: ILevel;
  total_study_contact_count?: string;
  active_contact_count?: string;
  transferred_contact_count?: string;
  new_student_not_attended_contact_count?: string;
  new_student_attended_contact_count?: string;
  partial_payed_count?: string;
  average_age?: number;
  podo_count?: number;
  teacher?: any;
  support?: any;
  branch_id?: string;
  real_total_contact_count?: number;
  course?: ICourse;
  lessonDay?: ILessonDay;
  lessonDays?: string[];
  allDays?: { [key in string]: 100 | 200 | 300 }[];
  lessonTime?: ILessonTime;
  room?: IRoom;
  time?: string;
  allContacts?: IContacts[];
  allContactsWithMonth?: IContacts[];
  redListCount?: number;
  finish_date: string;
  contactsCountByGender?: {
    count: string;
    gender: Gender;
  }[];
  previousLevel: ILevel["parent"];
}

export interface IGroupStatistics {
  [key: string]: IGroupStatisticsData[];
}

export interface IGroupStatisticsData {
  num_students: string;
  num_groups: string;
  state: string;
}

export interface IGroupStudyTypes {
  finish_date: string;
  label: string;
  lessons_count: number;
  type: 100 | 200;
  info: {
    error: string;
    joined_units: number;
    units_count: number;
    empty_lessons: number;
  };
}

export interface IGroupUnits {
  date: string;
  units: ISingleUnit[];
  status: TStatuses;
}

export interface ISingleUnit {
  parent_unit: {
    publicOrder: number;
  };
  publicOrder: number;
}

export interface IGroupInfo {
  support_id: number;
  teacher_id: number;
  units_finish_date: string;
  name: string;
  group_form: number;
  id: number;
  level: {
    id: number;
    name: string;
  };
  sub: {
    id: number;
    name: string;
  };
  currentUnit: {
    coins: number;
    deleted_at: null;
    id: number;
    level: number;
    name: string;
    order: number;
    parent_unit_id: number;
    points: number;
  };
}

export enum EPaidGroupType {
  NORMAL = 100,
  LATE_OPENED = 200,
  EARLY_CLOSED = 300,
}
