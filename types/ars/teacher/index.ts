import { IUser } from "../../user";

export interface IArsTeacher {
  id: number;
  opened: number;
  unit_id: number;
  date: string;
  units: IUnit[];
}

export interface IStudentScores {
  user_id: number;
  first_name: string;
  last_name: string;
  current_unit_id: number;
  current_activity: ICurrentActivity;
  points: number;
  coins: number;
  level: ILevel;
  avatar: {
    full_url: string;
  };
  units: IScoreUnit[];
}

export interface IScoreUnit {
  passed: number;
  opened: number;
  unit_id: number;
  is_populated: 1 | 0;
  collected_points: number;
  total_points: number;
  collected_coins: number;
  total_coins: number;
  is_progress: number;
  unit: {
    id: number;
    name: string;
    points: number;
    coins: number;
    order: number;
    level: {
      id: number;
      name: string;
    };
  };
}

interface ICurrentActivity {
  id: number;
  name: string;
}

export interface IUnit {
  id: number;
  name: string;
  points: number;
  coins: number;
  order: number;
  system_order: number;
  group_unit_id: number;
  level: ILevel;
  parent_unit: Omit<IUnit, "parent_unit">;
}

export interface ILevel {
  id: number;
  name: string;
}

export interface IExamDates {
  id: number;
  year: string;
  month: string;
  level_id: number;
  branch_id: number;
  status: number;
  group_id: number;
  teacher: IUser;
  support: IUser;
  supervisor: IUser;
  exam_parts: IExamParts[];
}

export interface IExamParts {
  id: number;
  date: string;
  time: string;
  room_id: number;
  branch_id: number;
  config: {
    type: number;
    name: string;
  };
}

export interface IProgress {
  id: number;
  user_id: number;
  base_user_id: number;
  group_unit_id: number;
  date: string;
  year: string;
  month: string;
  progress: number;
  level_id: number;
  passed: boolean;
  status: StudentProgressEnum;
}

export enum StudentProgressEnum {
  COUNTABLE = 100,
  NOT_COUNTABLE = 200,
}
