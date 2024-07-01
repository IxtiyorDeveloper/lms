import { IUser } from "./user";

export interface IGroupMentor {
  id: string;
  company_id?: string;
  group_id?: string;
  user_id: string;
  type: EMentorTypes;
  version_id: string;
  user?: IUser;
}
export enum EMentorTypes {
  Teacher = 100,
  Support = 200,
}
