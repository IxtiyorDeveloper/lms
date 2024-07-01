import { TStatuses } from "./general";
import { TMeta } from "./common";

export interface IStudentPayment {
  list: IPaymentList[];
  meta: TMeta;
}

export interface IPaymentList {
  date: string;
  amount: string;
  payment_type: TStatuses;
  full_name: string;
  role: string;
  type: TStatuses;
}

export enum ECallEventType {
  call_missed = 100,
  call_end = 200,
}

export enum ECallDirection {
  direction_outbound = 100,
  direction_inbound = 200,
  direction_local = 300,
}

export interface ICallHistoryStudent {
  id: number;
  uuid: string;
  event: number;
  callee: string;
  caller: string;
  record: string;
  duration: number;
  operator: string;
  direction: number;
  created_at: string;
  updated_at: string;
  createdBy: {
    id: number;
    username: string;
    email: string;
    status: number;
    created_at: string;
    updated_at: string;
    userProfile: {
      user_id: number;
      firstname: string;
      middlename: string | null;
      lastname: string;
      locale: string;
      gender: number;
      description: string | null;
      bio: string | null;
      dob: string;
    };
    balance: null;
    rbacAssignment: {
      id: number;
      rbac_role_id: number;
      rbac_role_shift_id: null;
      user_id: number;
      branch_type: number;
      rbacRole: {
        id: number;
        name: string;
        type: number;
        degree: number;
        department_id: number;
        shift_type: number;
        default_route: number;
        company_id: number;
        key: number;
        order: number | null;
      };
    };
  } | null;
}
