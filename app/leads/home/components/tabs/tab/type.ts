import { LeadTabEnums } from "constants/leadTabs";
import { ILead, IFetchList } from "types";

export type Type = {
  tableType: LeadTabEnums;
  leads: IFetchList<ILead> | undefined;
  isLoading: boolean;
  isCreatedTabs?: boolean;
};
