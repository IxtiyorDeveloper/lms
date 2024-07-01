import { IUser } from "../user";
import { OneStudent } from "../student";

export interface ICallStatistics {
  callee: string;
  caller: string;
  created_at: string;
  direction: ECallType;
  duration: number;
  event: number;
  id: number;
  operator: string;
  record: string;
  student: OneStudent;
  updated_at: string;
  uuid: string;
}

export interface IStatisticsTotal {
  count: number;
  today: number;
  direction: ECallType;
}

export interface ICallStatisticsData {
  date: string;
  uuid: string;
  event: string;
  callee: string;
  caller: string;
  record: string;
  at_time: string;
  gateway: string;
  duration: string;
  operator: string;
  direction: string;
  device_type: string;
}

export interface ICallStatisticsLifeCycleLink {
  id: number;
  life_cycle_id: number;
  model_id: number;
  model_type: number;
  model: ICallStatisticsLifeCycleLinkModel;
}

export interface ICallStatisticsLifeCycleLinkModel {
  id: number;
  name: string;
  phone_number: string;
  payment_mode: string;
  status: number;
  detail: ILifeCycleLinkModelDetail;
  public_offer_file_id: 409130;
}

export interface ILifeCycleLinkModelDetail {
  inn: string;
  mfo: string;
  p_c: string;
  bank: string;
  odek: string;
  email: string;
  phone: string;
  place: string;
  website: string;
  director: string;
  post_index: string;
  company_name: string;
}

export enum ECallType {
  outbound = "100",
  inbound = "200",
  local = "300",
}
