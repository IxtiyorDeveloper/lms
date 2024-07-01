import { IUser } from "../user";
import { TStatuses } from "../general";
import { TBranch } from "../branch";
import { IProduct } from "./products";
import { IGroup } from "../group";
import { ECashBoxProduct } from "types/stock";

export interface ITransactionIncome {
  id: number;
  payment_type: TStatuses;
  sub_payment_type: TStatuses;
  amount: number;
  created_at: string;
  type: TStatuses;
  createdBy: IUser;
  educationalIncome: IProductAndServiceIncome;
  onlinePaymentInvoices: any[];
  onlineTransactions: any[];
  productAndServiceIncome: IProductAndServiceIncome;
}

export interface IProductAndServiceStatistics {
  amount: string;
  count: string;
  origin_id: string;
  type: ECashBoxProduct;
}

export interface IProductAndServiceIncome {
  id: 1;
  income: Income;
  productAndService: IProduct;
  branch: TBranch;
  phone_number: string;
  full_name: string;
  type: TStatuses;
  process_type: TStatuses;
  firstname: string;
  lastname: string;
  phones: string;
  comment: string;
  avatar_url: string;
  view_level: TStatuses;
  product_type: TStatuses;
  product_name: string;
  user: IUser;
  group?: IGroup;
  group_name?: string;
  group_id?: string;
  group_note?: string;
  teacher_firstname?: string;
  teacher_lastname?: string;
  note?: string;
  origin_id: number;
}

export interface Income {
  id: number;
  payment_type: TStatuses;
  sub_payment_type: TStatuses;
  amount: number;
  created_at: string;
  type: TStatuses;
}
