import { TBranch } from "./branch";
import { IActionCategory } from "./actionCategory";
import { ICourse } from "./course";
import { TGroupType } from "./groupType";
import { ILevel } from "./level";
import { ILessonDay } from "./lessonDay";
import { ILessonTime } from "./lessonTime";

export interface IStopPageData {
  company: IActionCompany;
  academic: IActionAcademic;
  contact: IActionContact;
}

export interface IActionCompany {
  branches?: TBranch[];
  stopping_categories?: IActionCategory[];
}

export interface IActionAcademic {
  courses?: ICourse[];
  group_types?: TGroupType[];
  levels?: ILevel[];
  lesson_days?: ILessonDay[];
  lesson_times?: ILessonTime[];
}

interface IActionContact {
  course_id: number;
  group_type_id: number;
  level_id: number;
  parent_level_id: number;
  lesson_day_id: number;
  lesson_time_id: number;
  branch_id: number;
}
