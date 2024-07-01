import { IUser } from "./user";

export interface IExclusionConfig {
  keys: string[];
}

export interface IExclusion {
  id: number;
  user_id: number;
  config: IExclusionConfig;
  type: number;
  created_by: number;
  description: string;
  project: string;
  company_id: number;
  user: IUser;
}

export interface IAutoSmsKeys {
  [key: string]: string;
  // SEND_SMS_ABS_TO_PARENTS: string;
  // BIRTHDAY_CONGRATULATION: string;
  // NEW_STUDENT_NOT_ATTENDED: string;
  // NEW_STUDENT_ATTENDED: string;
  // NOT_PAID: string;
  // SHOULD_PAY: string;
  // CALL_CENTER: string;
  // HOLIDAY: string;
}

export interface IProjects {
  LMS: string;
}

export interface IExclusionPageData {
  auto_sms_keys: IAutoSmsKeys;
  projects: IProjects;
}
