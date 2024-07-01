import { ITaskModel } from "types/finance/transactionExpense";

export interface ITaskLinks {
  value: ITaskModel[] | undefined;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
