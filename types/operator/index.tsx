import { IUser } from "../user";

export interface IOperator {
  id: number;
  operator_number: number;
  created_at: string;
  status: 100 | 200;
  sip_login: string;
  sip_password: string;
  createdBy: IUser;
  user_id: number;
  user: IUser;
}
