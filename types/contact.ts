import { IUser } from "./user";
import { IActualPayment } from "./actualPayment";
import { ITransfer } from "./transfer";
import { IGroup } from "./group";
import { IContactResponsible } from "./contactResponsible";
import { IStudent } from "./student";
import { IUserProfile } from "./userProfile";
import { IAbsDate } from "./absentStudents";

export interface IContacts {
  id: number;
  status: 100 | 200 | 300 | 400 | 500 | 600;
  start_date: null;
  added_date: string;
  finish_date: string;
  student_next_status: null;
  user?: IUser;
  user_id?: string | number;
  avatar_url?: string;
  group_name?: string;
  branch_name?: string;
  firstname?: string;
  phones?: string;
  lastname?: string;
  actualPayment?: IActualPayment;
  actualTransfers: ITransfer[];
  actualTransfersWithMonth?: ITransfer[];
  contactResponsibles: IContactResponsible[];
  group: IGroup;
  transferredFrom?: IContacts;
  transferredTo?: IContacts;
  transferredToWithMonth?: IContacts;
  permissionActions: IStudentAccountActions;
  buttonActions: IStudentAccountActions;
  student: IStudent;
  userProfile?: IUserProfile;
  name?: string;
  abs_count?: number;
  absDates?: IAbsDate[];
}

export interface IStudentAccountActions {
  delete: boolean;
  move: boolean;
  transfer: boolean;
  stop: boolean;
  attend: boolean;
  book: boolean;
  notebook: boolean;
  transfer_back: boolean;
  activate: boolean;
  sms: boolean;
  call: boolean;
  ban: boolean;
  can_change_start_date: boolean;
  can_work_balance?: boolean;
  can_stop?: boolean;
}

export interface IStudentAccountLabels {
  start_date: boolean;
  coming: boolean;
  will_pay: boolean;
  call_request: boolean;
  not_answered: boolean;
  podo: boolean;
  colour_change: boolean;
}
