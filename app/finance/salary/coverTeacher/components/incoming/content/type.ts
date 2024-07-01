import {
  ICoverTeacherComponent,
  ICoverTeacherSettings,
} from "types/finance/salary";
import { IAssignment, IUser } from "types";
import { RestructuredObject } from "../../calendarFilter/functions";

export interface IContent {
  data:
    | {
        user_id?: number | undefined;
        covers_for_teacher: RestructuredObject[];
        receiver: IAssignment;
      }[]
    | undefined;
  settings: ICoverTeacherSettings | undefined;
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

