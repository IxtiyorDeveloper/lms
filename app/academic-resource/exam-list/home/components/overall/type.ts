import { IExamStats } from "types/exam/exam";

export interface IOverall {
  isLoading: boolean;
  counts: IExamStats | undefined;
}
