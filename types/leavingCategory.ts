import { TStatuses } from "./general";
import { TMeta } from "./common";

export interface ILeavingCategoryList {
  list: ILeavingCategory[];
  meta: TMeta;
}

export interface ILeavingCategory {
  id: number;
  name: string;
  type: number;
  effect_type: TStatuses;
  order: number;
}

export interface ILeavingCategoryUpdate {
  general: {
    name: string;
    type: number | string;
    effect_type: TStatuses | boolean | string;
  };
}
export enum EffectTypes {
  S100 = 100,
  S200 = 200,
}

export enum LeavingCategoryEnums {
  TRANSFERRING = 100,
  STOPPING = 200,
  LEAD = 300,
}
