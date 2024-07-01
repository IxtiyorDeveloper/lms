import { TBranch } from "types/branch";
import { TGroupType } from "types/groupType";
import { TMeta } from "../common";
import { IUserPhone } from "../userPhone";
import { TStatuses } from "../general";
import { IFile } from "../file";
import { IGroup } from "../group";
import { IContacts } from "../contact";
import {IPreferDays, IPreferTime} from "../student";

export type TWaitingList = {
  list: TList[];
  meta: TMeta;
  tabs?: { [key: string]: string };
  debts: number;
  balance: number;
};

export type TList = {
  note: string;
  status: number;
  type: number;
  user: TUser;
  course: TCourse;
  level: TLevel;
  featureLevel: TLevel;
  groupType: TGroupType;
  branch: TBranch;
  source: TSource;
  group?: IGroup;
  currentGroupContact: IContacts;
  dividedBalance?: {
    green: colorBalance[];
    yellow: colorBalance[];
    red: colorBalance[];
  };
  preferBranches: IPreferredBranch[];
  preferDays: IPreferDays[];
  preferTimes: IPreferTime[];
};

export interface IPreferredBranch {
  id: number;
  type: number;
  branch: IPreferredSingleBranch;
}

export interface IPreferredSingleBranch {
  id: number;
  name: string;
  address: string;
  landmark: string;
  latitude: string;
  longitude: string;
  description: string;
  location_url: string;
  status: number;
  region_id: number;
  deleted_at: string;
}

export interface colorBalance {
  id: number;
  user_id: number;
  year: string;
  month: string;
  actual_balance: number;
  total_balance: number;
  company_id: number;
}

export type TUser = {
  id: number;
  username: string;
  email: string;
  access_token: string;
  status: number;
  created_at: number;
  balance?: number;
  userLabels: any[];
  userPhones: IUserPhone[];
  userProfile: any;
};

export type TCourse = {
  id: number;
  name: string;
  status: number;
};

export type TLevel = {
  parent?: any;
  id: number;
  order: number;
  name: string;
  duration: number;
  parent_id: number | null;
  children: TLevel[];
};

export type TSource = {
  id: number;
  name: string;
  slug?: string;
  type: number;
  using_place: TStatuses;
  iconFile?: IFile;
  order?: number;
};
