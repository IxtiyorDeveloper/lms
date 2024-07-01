import { TStatuses } from "../general";
import { IContacts } from "../contact";
import { IUser } from "../user";
import { TGroupType } from "../groupType";
import { IGroup } from "../group";
import { IPaymentSubs } from "./statistics";
import { IProductAndService } from "types/statistics";

export interface IPaymentStatistics {
  grossTotal: IGTotal;
  total: IPTotal;
  expense: IExpense;
  potentialSalary: number;
  teachers: ITeacher[];
}

export interface IGTotal {
  total: number;
  paymentForm: IPaymentForm[];
  returned_money: number;
}

export interface IPTotal {
  bySource: {
    educational: IAmount[];
    productAndService: IProductAndService;
    student_balance: number;
  };
}

export interface IExpense {
  total: IPf[];
  byBranches: {
    amount: string | number;
    name: string;
  }[];
}

export interface IPaymentForm {
  amount: number;
  payment_type: TStatuses;
  subs: IPaymentSubs[];
}

export interface IAmount {
  amount: number | string;
  name: string;
}

export interface IPf {
  amount: number;
  payment_form: TStatuses;
}

export interface ITeacher {
  [key: string]: ITeacherObject[];
}
export interface ITeacherObject {
  user_id: number;
  key: TStatuses;
  user: IUser;
  group_count: string;
  groupCountDetail: IContactDetail[];
  total_amount: string;
}
export interface IContactDetail {
  count: string;
  total: number;
  group_form: TStatuses;
}
export interface IPaymentStatisticsGroup extends IGroup {
  id: string;
  state: string;
  name: string;
  total_amount: string | number;
  activeContacts: IContacts[];
  realPayedContacts: IContacts[];
  groupType: TGroupType;
}
