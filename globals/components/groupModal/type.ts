import { IGroupUnits } from "types";

export interface IRestructuredUnit {
  date: string;
  data: IGroupUnits[];
}

export enum ClosingGroupReasons {
  CLOSING_REASON_REPLACE_IN_THIS_MONTH = 100,
  CLOSING_REASON_REPLACE_IN_NEXT_MONTH = 200,
  NO_REPLACE = 300,
}
