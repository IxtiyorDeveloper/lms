import { IExamStatistics, IExamTeacherAverage } from "types/exam/exam";

export interface ITabs {
  statisticsPassRate: IExamTeacherAverage[] | undefined;
  statisticsAverage: IExamTeacherAverage[] | undefined;
  examProgress: IExamStatistics | undefined;
}
