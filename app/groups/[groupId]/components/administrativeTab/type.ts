import { IGroup } from "types";
import { IContactResponsible } from "types/contactResponsible";

export interface IAdministrativeTable {
  isLoading: boolean;
  group?: IGroup;
}

export interface IGroupPopover {
  name: string;
  amount: number;
  start_date: Date;
  finish_date: Date;
  status: string;
  lessons: number;
  debt: number;
  balance: number;
}

export interface IPriceStatus {
  groups: IGroupPopover[];
  contactResponsibles: IContactResponsible[] | undefined;
}
