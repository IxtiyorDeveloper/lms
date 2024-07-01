import { IUser } from "./user";
import { IActualPayment } from "./actualPayment";
import { IGroup } from "./group";
import { IContactResponsible } from "./contactResponsible";

export interface ITransfer {
  id: 54610;
  status: 500;
  user?: IUser;
  start_date: string;
  added_date: string | null;
  finish_date: string;
  deleted_at: string | null;
  actualPayment: IActualPayment;
  student_next_status: null;
  group: IGroup;
  contactResponsibles: IContactResponsible[];
}
