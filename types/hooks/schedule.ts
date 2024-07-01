import { IGroup } from "../group";
import { TBranch } from "../branch";
import { IDay } from "../day";
import { ITimes } from "../times";
import { TGroupType } from "../groupType";
import { ILevel } from "../level";
import { IRoom } from "../rooms";
import { ITeacher } from "../teacher";
import { IUser } from "../user";

export interface ISchedule {
  data: IGroup[];
  branches: TBranch[];
  days: IDay[];
  times: ITimes[];
  group_type: TGroupType[];
  levels: ILevel[];
  rooms: IRoom[];
  teachers: ITeacher[];
  default_branch: number | null;
  potentialGroups: IPotentialGroup[];
}

export interface ITimedPotentialGroups {
  lesson_time_id: string;
  related_groups: IPotentialGroup[];
}

export interface IPotentialGroup {
  branch_id: string;
  group_type_id: string;
  lesson_day_id: string;
  lesson_time_id: string;
  level: string;
  level_id: string;
  potential_group_student_count: string;
  student_count: string;
  sub_level: string;
  user: IUser;
}
