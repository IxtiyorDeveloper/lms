import { IUserProfile } from "../userProfile";

export interface IFinancePageDataModel {
  fixed_salary: number;
  difference_limit: number;
  min_salary?: any;
  max_salary?: any;
  kpis: any[];
  min_maxes: {
    to: number;
    max: number;
    min: number;
    from: number;
  }[];
  exclusions: any[];
  role: {
    id: number;
    name: string;
    type: number;
    degree: number;
    shift_type: number;
    default_route: number;
    company_id: number;
    key: number;
  };
  teacher_min_maxes: {
    [key: string]: {
      to: number;
      max: number;
      min: number;
      from: number;
    }[];
  };
}

export interface IFinancePageDataUser2 {
  id: number;
  username: string;
  email: string;
  status: number;
  created_at: string;
  userProfile: IUserProfile;
  balance?: any;
}

export interface IFinancePageDataUser {
  id: number;
  rbac_role_id: number;
  rbac_role_shift_id?: any;
  user_id: number;
  branch_type: number;
  user: IFinancePageDataUser2;
}

export interface IFinancePageDataKip {
  name: string;
  enum: number;
}

export interface IFinancePageDataConfig {
  users: IFinancePageDataUser[];
  kpis: IFinancePageDataKip[];
  group_form: {
    [key: string]: string;
  };
}

export interface IFinancePageData {
  model: IFinancePageDataModel;
  config: IFinancePageDataConfig;
}

export interface IPageDataPayment {
  is_active: boolean;
  blackListSwitchConstant: boolean;
  groupBlackListSwitchConstant: boolean;
  individualBlackListSwitchConstant: boolean;
  taking_mot_enabled: boolean;
  taking_mot_is_enabled: boolean;
  will_pay_max_day: number;
  will_pay_lesson_count: number;
  expense_security: boolean;
  expense_security_day_of_month: Date;
}
