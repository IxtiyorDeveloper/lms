import { TStatuses } from "./general";

export interface IActionCategory {
  id: number;
  name: string;
  type: TStatuses;
  effect_type: TStatuses;
}
