import { TStatuses } from "../general";

export interface IExpenseCategory {
  id: number;
  key: string;
  order: number;
  name: string;
  color: string;
  type: TStatuses;
  parent_id: number;
  children: IExpenseCategory[];
}
