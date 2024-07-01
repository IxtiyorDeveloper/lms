import { ITeacherObject } from "types/finance/paymentStatistics";

export interface ITableC {
  isLoading: boolean;
  data: {
    title: string;
    count?: number;
    data: ITeacherObject[] | undefined;
  };
}
