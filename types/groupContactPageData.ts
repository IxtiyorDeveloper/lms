import { IGroup } from "./group";
import { TCompany } from "./hooks";
import { ITeacher } from "./teacher";
import { ITimes } from "./times";
import { ILessonDay } from "./lessonDay";

export interface IResponseGCPageData {
  ok: boolean;
  status_code: number;
  description: string;
  result: IGCPageData;
}

export interface IGCPageData {
  course: IGCCourse;
  company: TCompany;
  academic: IAcademic;
  responsibles: ITeacher[];
  groupStates: {
    [key: string]: string;
  };
}

export interface IAcademic {
  teachers: ITeacher[];
  groups: IGroup[];
}

export interface IGCCourse {
  days: ILessonDay[];
  times: ITimes[];
}
