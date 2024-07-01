import { IPhone } from "types/staffSettings";
import { IUserPhone } from "../userPhone";

export interface INotification {
  next_page: number;
  total_count: number;
  notifications: TNotificationContent[];
}

export interface IFirebase {
  count: number;
  notification_exists: boolean;
  user_id: number;
}

export interface TNotificationContent {
  id?: number;
  title?: string;
  body?: string;
  date?: string;
  model_type?: ModalType;
  model_id?: number;
  user_id?: number;
  user_phones?: IUserPhone[];
  full_name?: string;
  meta_tags?: {
    stage?: number;
    status?: number;
    created_date?: string;
    id?: number;
    vacancy_id?: number;
  };
}

export enum ModalType {
  student = "student",
  lead = "lead",
  task = "task",
  candidate = "candidate",
}

export enum NotificationTopics {
  call_request = "call_request",
  task = "task",
}

export interface SingleNotification {
  id: number;
  user_id: number;
  app_id: number;
  topic: NotificationTopics;
  body: string;
  title: string;
  media_url: string;
  options: any;
  meta_tags: IMeta;
  status: number;
  created_at: string;
  month: number;
  year: number;
  origin_key: string;
  type: number;
  company_id: string;
  priority: number;
  send_date: string;
  is_read: number;
  app_status: number;
  web_status: number;
}

export interface IAllNotifications {
  next_page: number;
  total_count: number;
  notifications: SingleNotification[];
}

export interface IMeta {
  id: number;
  time: string;
  type: string;
  topic: NotificationTopics;
  full_name: string;
  send_date: string;
  model_type: ModalType;
  user_phones: IUserPhone[];
  status: number;
  stage: number;
}
