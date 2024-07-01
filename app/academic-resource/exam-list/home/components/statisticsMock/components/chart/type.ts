import { IExamStatistics, IExamTeacherAverage, IMockExamDataTeacherData } from "types/exam/exam";

export interface ITabs {
  statistics?: IMockExamDataTeacherData[] | undefined;
  statisticsPassRate: IExamTeacherAverage[] | undefined;
  statisticsAverage: IExamTeacherAverage[] | undefined;
}
