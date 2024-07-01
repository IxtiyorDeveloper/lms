import { IMockExamStats } from "types/exam/exam";

export interface IOverall {
  isLoading: boolean;
  counts: IMockExamStats | undefined;
}
