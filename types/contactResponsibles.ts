import { IUser } from "./user";

export interface IContactResponsibles {
  id: number;
  type: number;
  user: IUser;
  contact_id: number;
  user_id: number;
  datetime: Date;
}
