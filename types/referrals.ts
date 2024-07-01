import { TMeta } from "./common";
import { IAvatar } from "./staffSettings";

export interface IReferralLead {
  id: number;
  name: string;
  main_phone: string;
  comment: string;
  status: number;
  real_color: string | null;
  color: string | null;
  created_at: string;
  updated_at: string;
  source_id: number;
  lead_tab_id: number | null;
  leadActions: any[];
  leadPhones: any[];
  deleted_at: string | null;
  student_id: number | null;
  user: any | null;
  take_datetime: string;
}

export interface IReferredByObj {
  id: number;
  username: string;
  email: string;
  status: number;
  created_at: string;
  updated_at: string;
  userProfile: {
    avatar: IAvatar;
    user_id: number;
    firstname: string;
    middlename: string | null;
    lastname: string;
    locale: string;
    gender: 1 | 2;
    description: string;
    bio: string | null;
    dob: string;
  };
  balance: number | null;
  confirmedPhone: {
    id: number;
    type: number;
    phone_number: string;
    is_confirmed: number;
  };
}

export interface IReferralIndex {
  list: {
    id: number;
    status: 1000 | 2000 | 3000 | 4000 | 5000 | 6000;
    lead: IReferralLead;
    created_at: string;
    updated_at: string;
    balance: number;
    current_balance: number;
    referredBy: IReferredByObj;
    lastLifeCycle: any | null;
    student: any | null;
  }[];
  meta: TMeta;
  tabs: {
    "1000": string;
    "2000": string;
    "3000": string;
    "4000": string;
    "5000": string;
    "6000": string;
  };
}

export interface IReferralPageData {
  studentList: {
    label: string;
    value: string;
  }[];
}

export interface IReferralStatistics {
  year: number;
  month: number;
  full_url: string;
  green_balance: number;
  total_balance: number;
  current_balance: number;
}
