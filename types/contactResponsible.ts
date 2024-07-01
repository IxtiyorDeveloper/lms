import { IUser } from "./user";

export interface IContactResponsible {
  id: number;
  type: number;
  user: IUser;
  username: string;
  contact_id: number;
  user_id: number;
  datetime: string;
}
