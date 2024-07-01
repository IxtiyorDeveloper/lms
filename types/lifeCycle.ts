import { CandidateAction } from "constants/hr";
import { TStatuses } from "./general";
import { IUser } from "./user";
import { IUserProfile } from "./userProfile";

export interface ILifeCyclePageData {
  scenarios: { [key in TStatuses]: string };
  createdUsers: {
    username: string;
    id: string;
    firstname: string;
    lastname: string;
  }[];
  models: {
    groups: { [key in TStatuses]: string };
    models: { [key in TStatuses]: number[] };
  };
  scenariosWithAudio: number[];
}

export interface LifeCycle {
  id: number;
  scenario: number;
  data: LifeCycleData;
  description: string;
  datetime: string;
  record: string;
  ip_address: string;
  lifeCycleLinks: LifeCycleLink[];
  createdBy: IUser;
}

interface LifeCycleLink {
  id: number;
  life_cycle_id: number;
  model_id: number;
  model_type: number;
}

interface LifeCycleData {
  to_group_name: string;
  transferred_at: string;
  from_group_name: string;
  student_balance: number;
  to_contact_debt: number;
  from_contact_debt: number;
  student_full_name: string;
  to_contact_balance: number;
  from_contact_balance: number;
  from_contact_original_date_to: null | string;
  from_contact_original_date_from: string;
}

export interface ICandidateLifecycle {
  id: number;
  company_id: null;
  candidate_id: number;
  datetime: string;
  action: CandidateAction;
  type: number;
  comment: string;
  created_by: number;
  options: ILifecycleOptions;
  createdBy: {
    id: number;
    avatar: string;
    username: string;
    email: string;
    status: number;
    created_at: string;
    updated_at: string;
    userProfile: IUserProfile;
  };
}
export interface ILifecycleOptions {
  old_stage: number;
  new_stage: number;
  old_status: number;
  new_status: number;
  old_vacancy: string;
  new_vacancy: string;
  old_color: string;
  new_color: string;
  old_attributes: {
    stage: number;
    comment: string;
    rejection_type: number;
    status: number;
  };
  new_attributes: {
    stage: number;
    comment: string;
    rejection_type: number;
    status: number;
  };
  old_meeting: {
    comment: string;
    datetime: string;
    responsible: string;
    responsible_id: number;
  };
  new_meeting: {
    comment: string;
    datetime: string;
    responsible: string;
    responsible_id: number;
  };
  changed_attributes: ILifecycleChangedAttributes;
}
export interface ILifecycleChangedAttributes {
  vacancy: ILifecycleChangedAttributeString;
  first_name: ILifecycleChangedAttributeString;
  last_name: ILifecycleChangedAttributeString;
  dob: ILifecycleChangedAttributeString;
  gender: ILifecycleChangedAttributeString;
  description: ILifecycleChangedAttributeString;
  bonus_for: ILifecycleChangedAttributeString;
  color: ILifecycleChangedAttributeString;
}
export interface ILifecycleChangedAttributeString {
  old: string;
  new: string;
}
export interface ILifecycleChangedAttributeNumber {
  old: number;
  new: number;
}
