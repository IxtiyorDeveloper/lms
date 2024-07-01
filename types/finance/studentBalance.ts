import { TMeta } from "../common";
import { IUserPhone } from "../userPhone";

export interface IInTransaction {
  amount: string;
  type: string;
  date: string;
}

export interface IOutTransaction {
  amount: string;
  type: string;
  date: string;
}

export interface IByMonth {
  inTransactions: IInTransaction[];
  outTransactions: IOutTransaction[];
}

export interface ITotal {
  amount: string;
  type: string;
}

export interface IInTransaction2 {
  amount: string;
  type: string;
  day: string;
}

export interface IOutTransaction2 {
  amount: string;
  type: string;
  day: string;
}

export interface IByDate {
  inTransactions: IInTransaction2[];
  outTransactions: IOutTransaction2[];
}

export interface IStudentBalanceDashboard {
  byMonth: IByMonth;
  total: ITotal[];
  byDate: IByDate;
}

export interface IStudentBalanceDashboardByCondition {
  month: string;
  actual_balance: number;
  total_balance: number;
}

export interface IStudentBalanceWithdraw {
  phone_number: string;
  is_sent: boolean;
  expires_at: string;
}

export interface IStudentBalanceTransactionObj {
  id: number;
  action: number;
  type: number;
  amount: string;
  description: string | null;
  data: {
    type: string;
    month: string;
  };
  created_at: string;
  group: {
    id: number;
    status: number;
    state: number;
    note: string;
    start_date: string;
    finish_date: string;
    version_id: number;
    lesson_time_id: number;
    lesson_day_id: number;
    group_type_id: number;
    level_id: number;
    name: string;
    created_at: string | null;
    updated_at: string | null;
    closing_reason: string | null;
    group_share: string | null;
  };
  user: {
    id: number;
    username: string;
    email: string;
    status: number;
    created_at: string;
    student: {
      user_id: number;
      note: string | null;
      status: number;
      type: number;
      branch_id: number;
      source_id: number;
      updated_at: string;
      isBlackList: boolean;
      lessonCount: string;
    };
    updated_at: string;
    userPhones: IUserPhone[];
    userProfile: {
      user_id: number;
      firstname: string;
      avatar: {
        id: string;
        full_url: string;
        children: { full_url: string; resolution: string }[];
      };
      middlename: string | null;
      lastname: string;
      locale: string;
      gender: number;
      description: string | null;
      bio: string | null;
      dob: string;
    };
    balance: number;
  };
}

export interface IStudentBalanceTransactionsList {
  list: IStudentBalanceTransactionObj[];
  meta: TMeta;
  total_balance: string;
  total_count: [
    {
      count: string;
      type: "200" | "100";
    },
  ];
}

export interface IStudentBalanceWithdrawCheck {
  phone_number: string;
  is_confirmed: boolean;
  confirmation_id: number;
}

export interface IStockBarcodeCheck {
  id: number;
  name: string;
  cover_photo: string;
  category_id: number;
  type: number;
  order: number;
  activeCount: number;
  level_id: number;
  coverFile: {
    id: number;
    resolution: any;
    fullUrl: string;
    resolutions: any[];
  };
}
