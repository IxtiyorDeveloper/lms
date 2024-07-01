import { IUser } from "../user";
import { IStaff } from "../statistics";

export interface UserVacationHistory {
  id: number;
  user_id: number;
  vacation_slot_id: number;
  type: 100 | 200;
  from_date: string;
  recommended_date: string;
  createdBy: IUser;
  to_date: string;
}

export interface UserVacationHistoryObj {
  [key: string]: {
    user: IUser;
    vacations: UserVacationHistory[];
  };
}

export interface IActiveVacations {
  [key: string]: {
    user: IUser;
    vacations: UserVacationHistory[];
  };
}

export interface IVacationStaff {
  user_id: number;
  key: number;
  status: number;
  datetime: string;
  hired_date: string;
  next_recommended_vacation: string,
  nation_id: number;
  family_status: number;
  job_type: number;
  passport_number: string;
  citizenship: string;
  passport_given_date: string;
  passport_expire_date: string;
  passport_given_by: string;
  born_address: string;
  official_address: string;
  live_address: string;
  ielts_score: null | number;
  candidate_id: number;
  user: IUser;
  activeVacation: IStaffVacation;
}

export interface IVacationRole {
  id: number;
  name: string;
  type: number;
  degree: number;
  department_id: number;
  shift_type: number;
  default_route: number;
  company_id: number;
  key: number;
}

export interface IVacationDepartment {
  id: number;
  name: string;
  type: number;
}

export interface IVacationShift {
  id: number;
  rbac_role_id: number;
  name: string;
}

export interface IActiveVacationData {
  department: IVacationDepartment;
  role: IVacationRole;
  shift: IVacationShift;
  staffs: IVacationStaff[];
}

export interface IActiveVacationsData {
  data: IActiveVacationData[];
  count: number;
}

export interface IRolesForVacation {
  id: number;
  name: string;
  type: number;
  degree: number;
  department_id: number;
  shift_type: number;
  company_id: number;
  key: number;
  users: IUser[];
}

export interface IDep {
  id: number;
  name: string;
  type: number;
}

export interface IRole {
  id: number;
  name: string;
  type: number;
  degree: number;
  department_id: number;
  shift_type: number;
  default_route: number;
  company_id: number;
  key: number;
}

export interface IShift {
  id: number;
  rbac_role_id: number;
  name: string;
}

export interface IUserObj {
  id: number;
  rbac_role_id: number;
  rbac_role_shift_id: number;
  user_id: number;
  branch_type: number;
  user: IUser;
  staff: IStaff;
}

export interface IDepartmentsListForVacation {
  department: IDep;
  role: IRole;
  shift: IShift;
  assignments: IUserObj[];
}

export enum VacationStatus {
  ok = 100,
  warning = 200,
  red = 300,
}


export interface IStaffVacation {
  id: number;
  user_id: number;
  vacation_slot_id: number;
  type: number;
  note: string;
  from_date: string;
  to_date: string;
  created_at: string;
  recommended_date: string;
}

export interface IStaffVacationsList {
  user: IUser;
  vacations: IStaffVacation[];
}
