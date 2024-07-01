import { TGroupType } from "./groupType";
import { TStatuses } from "./general";
import { TCompany } from "./hooks";

export interface IAdminGroupInitialPage extends TCompany {
  group_types: TGroupType[];
  tabs: ITab[];
}

type ITab = {
  [key in TStatuses]: {
    name: string;
    attribute: string;
    value: key;
  };
};
