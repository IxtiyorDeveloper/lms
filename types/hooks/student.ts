import { EStudentMatchType } from "../student/waitingList";
import { IGroup } from "types";

export type TSaveStudent = {
  first_name: string;
  last_name: string;
  gender: number;
  course_id: number;
  branch_id: number;
  level_id: number;
  source_id: number;
  is_ban: number;
  group_type_id: number;
  avtar_file_id: number;
  prefer_time: TSaveStudentPreferTime[];
  phones: TSaveStudentPhones[];
  dob: number;
  note: number;
};

export type TSaveStudentPreferTime = {
  day_id: number;
  time_id: number;
};

export type TSaveStudentPhones = {
  type: number;
  phone_number: string;
  is_confirmed: boolean;
  confirmation_id: number;
};

export type IMatchGroup = {
  [key in EStudentMatchType]: IGroup[];
};
