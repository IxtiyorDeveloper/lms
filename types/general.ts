import { TMeta, TParams } from "./common";
import { IShift } from "./staffSettings";
import {
  GROUP_FORM_GROUP,
  GROUP_FORM_INDIVIDUAL,
} from "../constants/groupForms";

export enum EGroupType {
  NOGROUP = "noGroup",
  FULLPAID = "fullPaid",
  FULL = "full",
  NOTFULL = "notFull",
  NODESIGN = "noDesign",
  DEFAULT = "default",
}

export enum EPayment {
  YELLOW = "yellow",
  RED = "red",
  GREEN = "green",
  UNDEFINED = "undefined",
}

export enum EStudentAttendance {
  CAME = "came",
  NOT_CAME = "not_came",
  STAR = "star",
  ABS = "abs",
  ADD = "add",
  UNAVAILABLE = "unavailable",
  WHITE = "white",
}

export enum EAttendanceStatuses {
  CAME = 100,
  NOT_CAME = 200,
  ABS = 300,
  UNAVAILABLE = 400,
  ADD = 500,
  STAR = 600,
  WHITE = 700,
}

export enum Gender {
  GENDER_MALE = 1,
  GENDER_FEMALE = 0,
}

export enum EPayment {
  CASH = 100,

  MOT = 200,

  CARD = 300,

  ONLINE_PAYMENT = 300,
}

export type TStatuses =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 1000
  | 1100
  | 1200
  | 1300
  | 1400
  | 1500;

export type TGeneral = {
  [key: string]: string;
};

export type Status = {
  [key in TStatuses]: string;
};

export interface IFetchList<T, S = any, A = any> {
  data: {
    list: Array<T>;
    meta: TMeta;
  };
  meta?: TMeta;
  list?: Array<T>;
  shifts?: IShift[];
  tabs?: { [key: string]: number };
  totals?: S;
  today?: A;
  statistics: Array<S>;
  tab_totals?: {
    id: string;
    count: string;
  }[];
}

export interface IFetchTeachers<T> {
  teachers: Array<T>;
  lostStudents: Array<T>;
  amount: TMeta;
  tabs?: { [key: string]: number };
}

export interface ServerResponse<T> {
  ok: boolean;
  status_code: number;
  description: string;
  result: T;
}

export interface ResponseAxios<T> {
  data: ServerResponse<T>;
  status: number;
  statusText: any;
  headers: any;
  config: any;
  request: any;
}

export type IPromiseData<T, S = any, A = any> = Promise<IFetchList<T, S, A>>;
export type IWithoutPromiseData<T, S = any, A = any> = IFetchList<T, S, A>;
export type IData<T> = Promise<ResponseAxios<T>>;

export enum PaymentForms {
  BANK = "100",
  MOT = "200",
}

export enum IncomeGroupedPaymentTypes {
  MOT = "100",
  CASH = "200",
  CARD = "300",
  ONLINE_PAYMENT = "400",
  BALANCE = "500",
}

export enum SalaryEnums {
  FIXED_SALARY = 100,
  KPI = 200,
  BONUS = 300,
  CORRECTION = 400,
  PENALTY = 500,
  TAX = 600,
}

export enum SalarySubTypeEnums {
  KPI_TEACHING_GROUP = 221,
  KPI_TEACHING_INDIVIDUAL = 222,
  SUB_TYPE_CORRECTION = 400,
  SUB_TYPE_PENALTY = 500,
  SUB_TYPE_TAX = 500,
}

export const SalaryToGroupForm = {
  [GROUP_FORM_GROUP]: SalarySubTypeEnums.KPI_TEACHING_GROUP,
  [GROUP_FORM_INDIVIDUAL]: SalarySubTypeEnums.KPI_TEACHING_INDIVIDUAL,
};

export enum CourseTypes {
  regular = 100,
}

export interface GeneralParams {
  general: TParams;
}

export enum HolidayType {
  active = 100,
  inactive = 200,
}

export enum HolidayNotifyType {
  on = 100,
  off = 200,
}

export enum studentDeleteType {
  regular = "regular",
  stopping = "stopping",
}

export enum StudentType {
  TYPE_NEW = 100,
  TYPE_OLD = 200,
  TYPE_BANNED = 300,
}

export enum StudentStat {
  STUDENT_WAITING = 100,
  STUDENT_STUDYING = 200,
  STUDENT_ARCHIVED = 300,
}

export interface IShortUser {
  avatar: {
    full_url: string;
  };
  firstname: string;
  id: string;
  lastname: string;
}

export enum UpdateLabelPages {
  REGULAR = "regular",
  GROUP_VIEW = "group_view",
  PODO = "podo",
}

export enum ESelectAll {
  no_value = "no_value",
  regular = "regular",
}
