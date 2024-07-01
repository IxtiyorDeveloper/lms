import { IDepartment } from "../department";
import { IRole } from "../role";
import { IAssignment, TAssignment } from "../assignment";
import { TStatuses } from "../general";
import { IUser } from "../user";
import { IGroup } from "../group";
import { TGroupType } from "../groupType";
import { ICourse } from "../course";
import { IBranch } from "../staffSettings";
import { IExpenseCategory } from "./expenseCategory";

export enum salaryFieldTypes {
  CARD = "card",
  PENALTY = "penalty",
}

export interface ISalaryMain {
  department: IDepartment;
  role: IRole;
  shift: any;
  assignments: TAssignment[];
  config: IConfig;
  difference: IDifference;
}

export interface IDifference {
  average: number;
  total: number;
}

export interface IPreviousMonthSalaryData {
  month: string;
  total_salary: string;
  year: string;
  description: string;
}

export interface IActualSalary {
  id: number | null;
  total_salary: number | null;
  avans: number | null;
  penalty: number;
  card: number;
  cash: 0;
  isGiven: false;
  aggregatedComponents: IAggregated[];
  prepayments: IPrePayment[];
  receiver: IUser;
  receiver_id: number;
  tax: number;
  experience: number;
  amount_status: ESalaryRange;
}

export interface IRestructuredSalary {
  id: number;
  name: string;
  num: number;
  type: number;
  children: ISalaryMain[];
}

interface IPrePayment {
  id: number;
  description: string;
  payment_form: number;
  amount: number;
  color: string;
  orderedBy: IUser;
  receivedBy: IUser;
  createdBy: IUser;
  branch: IBranch;
  expense_group_id: 3933;
  expenseCategory: IExpenseCategory;
  created_at: string;
  updated_at: string;
}

export interface IConfig {
  id: number;
  role_id: number;
  shift_id: number;
  fixed_salary: number;
  min_salary: number;
  extra: {
    kpis: IKpi[];
    min_maxes: min_maxes[];
    teacher_min_maxes: {
      [key: string]: min_maxes[];
    };
  };
  company_id: 1;
  max_salary: 30000000;
}

interface IKpi {
  enum: TStatuses;
  configuration: {
    ratio: 100000;
  };
}

export interface min_maxes {
  to: number;
  max: number;
  min: number;
  from: number;
}

export enum RoleKey {
  Teacher = 100,
}

export interface IAggregated {
  data: IAggregatedData;
  id: null | number;
  salary_id: null | number;
  type: TStatuses;
  sub_type: TStatuses | null;
  created_by?: null | number;
  description: null | string;
  value: number;
  created_at: null | string | number;
  typeLabel?: string;
  subTypeLabel: string | number | null;
  status: TStatuses;
}

export interface IAggregatedData {
  share: number;
  count: number;
}

export interface ICoverTeacher {
  id: number;
  salary_id: number;
  type: TStatuses;
  sub_type: number;
  created_by: number;
  description: string;
  value: number;
  created_at: string;
  status: null | TStatuses;
  salary: IActualSalary;
  children: ICoverTeacher[];
}

export interface ICoverTeacherSettings {
  shares: IShare[];
}

export interface ISalaryPageData {
  departments: IDepartment[];
  roles: IRole[];
  assignments: IAssignment[];
}

export interface IShare {
  from: { due_amount: null | number };
  groupType: { name: string; id: number };
  to: { reward_amount: null | number };
}

export interface IDetailedCoverTeacher {
  assignments: IAssignment[];
  components: ICoverTeacherComponent[];
}

export interface ICoverTeacherComponent {
  id: number;
  salary_id?: number;
  type: TStatuses;
  sub_type: number;
  created_by?: number;
  description?: null | string;
  value: number | string;
  created_at?: string;
  status: TStatuses;
  data: PairData;
  pair: IPair;
  salary?: IActualSalary;
  assignment?: IAssignment;
  user_assignment?: IAssignment;
}

export interface IPair {
  id: number;
  salary_id: number;
  type: TStatuses;
  sub_type: number;
  created_by: number;
  description: string;
  value: string;
  created_at: string;
  status: TStatuses;
  data: PairData;
  salary: IActualSalary;
  receiver?: IAssignment;
}

export interface PairData {
  date: string;
  group: IGroup;
  has_money_operation: boolean;
}

export interface IDetailedCoverTeacherFormData {
  covers: IFormDataCover[];
  groups: IGroup[];
}

export interface IFormDataCover {
  assignment_id: number;
  group_id: number;
  description: string;
  main_description: string;
  has_cover_teacher_money_operation: boolean;
  has_main_teacher_money_operation: boolean;
  due_amount: string;
  reward_amount: string;
}

export enum CoverActions {
  UPDATE = "update",
  DELETE = "delete",
  CREATE = "create",
}

export enum StaffStatus {
  STATUS_NEW = 100,
  STATUS_FIRED = 400,
  STATUS_STOPPING = 300,
  WORKING = 200,
}

export interface IGetDetailed {
  id: number;
  state: number;
  group_type_id: number;
  group_form: number;
  name: string;
  totalRealPayedContacts: string;
  total_amount: string;
  groupType: TGroupType;
  course: ICourse;
}

export enum SalaryType {
  green = "green",
  red = "red",
  more_than_salary = "more_than_salary",
  unclear = "unclear",
}

export enum ESalaryRange {
  UNCLEAR = 100,
  LOW = 200,
  NORMAL = 300,
  HIGH = 400,
}

export enum ESortableSalaryFields {
  total_salary = "total_salary",
  avans = "avans",
  tax = "tax",
  penalty = "penalty",
  card = "card",
  cash = "cash",
}

export enum ESalaryProgress {
  up = "up",
  down = "down",
  same = "same",
}
