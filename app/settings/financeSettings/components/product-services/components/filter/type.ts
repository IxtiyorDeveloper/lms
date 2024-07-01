import { IProductEnums } from "types";
import { IAction } from "../../index";

export interface IFilter {
  data?: IProductEnums | undefined;
  handleOpen?: (actions: IAction) => void;
  selects?:
    | {
        sellPlaces: { label: string; value: string }[] | undefined;
        pricingTypes: { label: string; value: string }[] | undefined;
        viewLevels: { label: string; value: string }[] | undefined;
        types: { label: string; value: string }[] | undefined;
      }
    | undefined;
}
