import { IDebtorsStatistics } from "types/finance/debtors";

export interface IStatistics {
  data: IDebtorsStatistics | undefined;
  isLoading?: boolean;
}
