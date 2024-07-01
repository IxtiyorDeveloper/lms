import { IStationaryHistoryData, IStationaryPaymentData } from "./student";
import { TList } from "./hooks";

export interface ICalculation {
  group?: {
    balance: number;
    debt: number;
    date_from: string;
    date_to: string;
    lesson_count: number;
  };
  student: {
    balance: null | number;
    debt: null | number;
    difference: null | number;
    dividedBalance: TList["dividedBalance"];
  };
  allowedPaymentTypes: {
    balance: boolean;
    card: boolean;
    cash: boolean;
    mot: boolean;
  };
  warning: string;
  giveStationary: boolean;
  notifications: {
    date_to: string;
  };
  stationaryHistory?: IStationaryPaymentData;
}

export interface IDispersion {
  year: string;
  month: string;
  sum: number;
}
