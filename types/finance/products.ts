import { Status, TStatuses } from "../general";
import { TMeta } from "../common";
import { IFile } from "types/file";

export interface IProductList {
  list: IProduct[];
  meta: TMeta;
}

export interface IProductEnums {
  sellPlaces: Status;
  pricingTypes: Status;
  viewLevels: Status;
  types: Status;
}

export interface IProduct {
  id: 3;
  name: string;
  description: string;
  pricing_type: TStatuses;
  sell_place: string;
  view_level: string;
  price: string;
  type: string;
  status: TStatuses;
  stockItem: string | null;
  iconFile: IFile;
}
