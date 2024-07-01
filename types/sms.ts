import { TMeta } from "./common";

export interface Sms {
  id: number;
  phone_number: string;
  text: string;
  status: null;
  created_at: string;
}
export interface SmsList {
  list: Sms[];
  meta: TMeta;
}
