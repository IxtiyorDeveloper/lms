import { IShortUser } from "../general";

export interface IFreshman {
  count: string;
  balance: string;
}

export interface IFreshmanStatus {
  type: string;
  count: string;
}

export interface IFreshmanProgress {
  label: string;
  count: string;
  type: string;
}

export interface IFreshmanBranch {
  name: string;
  type: string;
  count: string;
}

export interface IFreshmanAdmins {
  label: string;
  avatar: string;
  type: string;
  count: string;
}

export interface ILost {
  count: string;
  balance: string;
}

export interface ILostByType {
  type: string;
  count: string;
}

export interface ILostProgress {
  type: string;
  label: string;
  count: string;
}

export interface ILostTime {
  type: string;
  label: string;
  count: string;
}

export interface ILostAge {
  type: string;
  label: string;
  count: string;
}

export interface ILostBranch {
  name: string;
  count: string;
  type: string;
}

export interface ILostLevel {
  type: string;
  name: string;
  avatar: string;
  count: string;
}

export interface ILostCategory {
  type: string;
  label: string;
  count: string;
}

export interface ILostTeacherShare {
  type: string;
  label: string;
  count: string;
}

export interface IFreshmanLost {
  freshman: IFreshman;
  freshmanStatus: IFreshmanStatus[];
  freshmanProgress: IFreshmanProgress[];
  freshmanBranch: IFreshmanBranch[];
  freshmanAdmin: IFreshmanAdmins[];
  freshmanLevel: any[];
  progressByAmount: any[];
  progressByMoney: any[];
  freshmanAdminShare: any[];
  lost: ILost;
  lostByDay: ILostByType[];
  lostByType: ILostByType[];
  lostProgress: ILostProgress[];
  lostTime: ILostTime[];
  lostTeacherShare: ILostAge[];
  lostAge: ILostAge[];
  lostBranch: ILostBranch[];
  lostLevel: ILostLevel[];
  lostTeacher: ILostLevel[];
  lostAdminShare: any[];
  lostCategory: ILostCategory[];
  lostTeacherSharelostTeacherShare: ILostTeacherShare[];
}

export interface IFreshmanLostPageData {
  createdUsers: IShortUser[];
}
