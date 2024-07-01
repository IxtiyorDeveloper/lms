import { TStatuses } from "../general";
import { ESubPaymentPayment } from "../../constants/payment";

export interface IStatistics {
  expense: expense[];
  income: income[];
  onlinePaymentPercent: number;
}

export type expense = {
  amount: number;
  payment_form: TStatuses;
};

export type income = {
  amount: number;
  payment_type: TStatuses;
  subs: IPaymentSubs[];
};

export interface IPaymentSubs {
  sub_payment_type: ESubPaymentPayment;
  amount: string;
}
