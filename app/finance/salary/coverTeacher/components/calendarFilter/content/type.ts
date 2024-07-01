import {
  ICoverTeacherComponent,
  ICoverTeacherSettings,
  IDetailedCoverTeacher,
} from "types/finance/salary";
import { IAssignment, IUser } from "types";

export interface IContent {
  data: IRestructured[] | undefined;
  settings: ICoverTeacherSettings | undefined;
  mainData: IDetailedCoverTeacher | undefined;
}
export interface IRestructured {
  date: string;
  data: IRestructuredCover[];
}
export interface IRestructuredCover {
  covers_for_teacher: ICoversForTeacher[];
  receiver: IAssignment;
  user_id?: number;
}
export interface ICoversForTeacher {
  user?: IUser;
  user_id: number;
  user_covers: ICoverTeacherComponent[];
}
