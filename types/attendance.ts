import { TStatuses } from "./general";
import { IUser } from "./user";

export interface IAttendance {
  id: number;
  user_id: number;
  date: string;
  group_contact_id: string;
  reason: null | string;
  status: TStatuses;
  createdBy: IUser;
  updatedBy: IUser;
  created_at: string;
  updated_at: string;
}
