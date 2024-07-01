import { StaffStatus } from "../finance/salary";
import { IUser } from "../user";

export interface IKpiStatistics {
  byRoles: IByRole[];
  staffs: IStaff[];
}
export interface IStaffMotivationStatistics {
  byRoles: IByRole[];
  staffs: IStaffMotivation[];
}

export interface IByRole {
  role_id: string;
  name: string;
  amount: string;
  count: string;
}

export interface IWorkingPeriod {
  end_date: string;
  start_date: string;
}

export enum EVacationStatus {
  green = 100,
  yellow = 200,
  red = 300,
}

export interface IVacation {
  id: number;
  user_id: number;
  vacation_slot_id: number;
  type: number | string;
  from_date: string;
  to_date: string;
  created_at: string;
  note: string;
  createdBy: IUser;
  recommended_date: string;
}

export interface IStaff {
  scenario?: string;
  amount: string;
  firstname: string;
  lastname: string;
  user_id: string;
  hired_date: string;
  key: number;
  datetime: string;
  next_recommended_vacation: string;
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
  ielts_score: number;
  candidate_id: number;
  group_count: number;
  upcomingVacations: IVacation[];
  pastVacations: IVacation[];
  working_periods: IWorkingPeriod[];
  activeVacation: null | any;
  vacation_status: EVacationStatus;
  status: StaffStatus;
  components: {
    value: number;
  }[];
}
export interface IStaffMotivation {
  amount: string;
  ordered_by: string;
  received_by: string;
  user_id: string;
  description: string;
}
