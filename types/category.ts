import { TStatuses } from "./general";

export interface ICategory {
  id: number;
  company_id: number;
  name: string;
  type: TStatuses;
  effect_type: TStatuses;
  order: number;
  deleted_at: null;
}
