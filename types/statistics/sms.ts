import { IUserPhone } from "../userPhone";

export interface ISMSCounts {
  smsTotal: ISMSCount;
}

export interface ISMSCount {
  total: ISMSTotal[];
  today: ISMSToday[];
}

export interface ISMSTotal {
  count: string | number;
  label: string;
}

export interface ISMSToday {
  count: string | number;
  label: string;
}

export interface ISmsDelivery {
  list: ISmsDeliveryList[];
  meta: ISmsDeliveryMeta;
  totals: ISmsDeliveryTotal[];
  templates: ISmsDeliveryTemplate[];
}

export interface ISmsDeliveryList {
  id: number;
  template_id: number;
  phone_number: string;
  text: string;
  status: number;
  created_at: string;
  created_by: any;
  model_type: number;
  model_id: number;
  type: number;
  phone_type: number;
  userPhone: ISmsDeliveryUserPhone;
}
export interface ISmsDeliveryUserPhone {
  id: number;
  type: number;
  phone_number: string;
  is_confirmed: number;
  user: ISmsDeliveryUser;
}

export interface ISmsDeliveryUser {
  id: number;
  username: string;
  email: string;
  status: number;
  created_at: string;
  updated_at: string;
  userProfile: ISmsDeliveryUserProfile;
  balance: any;
}
export interface ISmsDeliveryUserProfile {
  user_id: number;
  firstname: string;
  middlename: any;
  lastname: string;
  locale: string;
  gender: number;
  description?: string;
  bio: any;
  dob: string;
}
export interface ISmsDeliveryMeta {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
}

export interface ISmsDeliveryTotal {
  label: string;
  status: string;
  count: string;
}

export interface ISmsDeliveryTemplate {
  id: string;
  company_id: string;
  type: string;
  scenario: string;
  name: string;
  text: string;
  model_type: any;
  model_id: any;
  deleted_at: any;
}
