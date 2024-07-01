import { IUser } from "./user";
import { TSource } from "./hooks";

export interface TLeadActions {
  action: number;
  datetime: string;
  lead_id: number;
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
      middlename: string;
      lastname: string;
      locale: string;
      gender: string;
      description: string;
      bio: string;
      dob: string;
    };
    balance: number;
  };
}

export interface ILeadHistory {
  id: number;
  scenario: number;
  data: ILeadData;
  description: string;
  datetime: string;
  ip_address: string;
  lifeCycleLinks: ILifeCycleLink[];
  createdBy: IUser;
}

export interface ILeadData {
  action: number;
  status: number;
  comment: string;
  operator: any;
}

export interface ILifeCycleLink {
  id: number;
  life_cycle_id: number;
  model_id: number;
  model_type: number;
}

export interface ILead {
  id: number;
  name: string;
  main_phone: string;
  comment: string;
  status: number;
  color: string;
  created_at: string;
  source_id: any;
  lead_tab_id: any;
  is_student: any;
  leadActions: TLeadActions[];
  leadPhones: any[];
  lastHistory: any;
  leavingCategory: {
    id: number;
    company_id: number;
    name: string;
    type: number;
    effect_type: number;
    order: number;
    deleted_at: string;
    key: number;
  };
  deleted_at: any;
  user: IUser;
  responsible: IUser;
  source: TSource;
  registeredBy: null;
  lead_count?: number;
}
export interface ISmsHistory {
  id: number;
  template_id?: number;
  phone_number: string;
  text: string;
  status: number;
  created_at: string;
  created_by: number;
  model_type?: number;
  model_id?: number;
  type: number;
  createdBy: IUser;
}

export interface ILeadIndexData {
  users: ILeadUser[];
  source: ILeadSource[];
  configCreatedBy: ILeadConfigCreatedBy[];
  labels: { [key: string]: string };
}

export interface ILeadUser {
  username: string;
  id: string;
  firstname: string;
  lastname: string;
}

export interface ILeadSource {
  id: number;
  name: string;
  type: number;
  using_place: number;
  slug?: string;
}

export interface ILeadConfigCreatedBy {
  username: string;
  id: string;
  firstname: string;
  lastname: string;
}

export interface ILeadStatisticsUsers {
  new_leads: {
    today: number;
    this_month: number;
  };
  registered_leads: {
    today: number;
    this_month: number;
  };
  users: IUser[];
  community_manager: {
    count: string;
    total_count: string;
  };
}
