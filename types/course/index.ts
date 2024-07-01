import { TGroupType } from "../groupType";
import { ILessonDay } from "../lessonDay";
import { ILessonTime } from "../lessonTime";
import { ILevel } from "../level";

export interface ICourse {
  id: number;
  name: string;
  company_id: string;
  status: 100 | 200 | 300;
  coursePrices: ICoursePrice[];
  groupTypes: TGroupType[];
  lessonDays: ILessonDay[];
  lessonTimes: ILessonTime[];
  parentLevels: ILevel[];
}

export interface ICoursePrice {
  id: number;
  course_id: number;
  level_id: number;
  group_type_id: number;
  branch_id: number;
  amount: number;
}
