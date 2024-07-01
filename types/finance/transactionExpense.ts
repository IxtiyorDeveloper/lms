import { IUser } from "../user";
import { TBranch } from "../branch";
import { TStatuses } from "../general";

export interface ITransactionExpense {
  id: number;
  task_id: number;
  description: string;
  payment_form: TStatuses;
  amount: number;
  color: string;
  orderedBy: IUser;
  receivedBy: IUser;
  createdBy: IUser;
  branch: TBranch;
  expenseGroup: IExpenseGroup;
  expense_group_id: number;
  expenseCategory: IExpenseCategory;
  created_at: string;
  expenseLinks: [];
  expenseFiles: IExpenseFile[];
  linkedTasks: ITaskModel[];
}

export interface ITaskModel {
  id: number;
  model_id: number;
  model_type: number;
}

export interface IExpenseGroup {
  id: number;
  name: string;
  description: string;
}

export interface IExpenseCategory {
  id: number;
  key: string;
  order: number;
  name: string;
  color: string;
  type: TStatuses;
  parent_id: string;
}

export interface IExpenseFile {
  id: 2;
  name: string;
  file: {
    id: 23692;
    component: string;
    base_url: string;
    path: string;
    type: string;
    size: number;
    name: string;
    upload_ip: string;
    created_at: number;
    full_url: string;
  };
}
