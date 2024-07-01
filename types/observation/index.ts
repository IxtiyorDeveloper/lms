import { IFile } from "../file";
import { TParams } from "../common";
import { IUser } from "types";

export enum EFieldType {
  Comment = 100,
  Rating = 200,
}

export enum EObservationStatus {
  Draft = 100,
  Published = 200,
}

export interface IRankingObservation {
  id: number;
  group_id: number;
  created_at: string;
  branch_id: string;
  status: number;
  mentor_id: number;
  score: number;
  observer: IUser;
  mentor: IUser;
  details: IDetails;
  buttonActions: IObsActions;
  aspects: IObsAspect[];
  origin_id: number;
  type: EObservationStaff;
}

export interface IObs {
  userProfile: {
    fullName: string;
    avatar: IFile;
  };
}

export interface IDetails {
  support: string;
  teacher: string;
  group: IGroupDetail;
  office_hour: IOfficeHour;
  students: IDetailStudent[];
}

export interface IOfficeHour {
  date: string;
  time: string;
}

export interface IDetailStudent {
  base_user_id: number;
  group_name: string;
  teacher_name: string;
  id: number;
  student: IUser;
}

export interface IGroupDetail {
  branch: string;
  group_id: number;
  lessonDay: string;
  level: string;
  name: string;
  parentLevel: string;
  teacher: string;
  time: string;
  type: string;
}

export interface IObsActions {
  canEdit: boolean;
  canDelete: boolean;
}

export interface IObservationEnum {
  status: TParams;
  groups: TParams;
  keys: TParams;

  structure: IObsAspect[];
}

export interface IObsInnerAspect {
  id: number;
  key: number;
  comment: string;
  score: number;
  key_label: string;
  icon: string;
}

export interface IObsAspect {
  group: number;
  group_label: string;
  type: number;
  aspects: IObsInnerAspect[];
}

export interface IObservationStatistics {
  [EObservationStaff.teacher]: IObservationSingleStatistics;
  [EObservationStaff.support]: IObservationSingleStatistics;
}

export interface IObservationSingleStatistics {
  observed_count: number;
  not_observed_count: number;
  observation_score: number;
  total_observation_count: number;
}

export interface IMainObservation {
  id: number;
  mentor_id: number;
  base_mentor_id: number;
  year: number;
  month: number;
  updated_at: string;
  order: number;
  class: number;
  norma: number;
  exam_norma: number;
  lost_count: number;
  group_count: number;
  individual_group_count: number | null;
  academic_director_comment: string;
  student_count: number;
  exam_failed_count: number;
  exam_group_count: number;
  branch_id: string[];
  progress_total: number;
  lost_total: number;
  offence_total: number;
  exam_total: number;
  date: string;
  overall: number;
  real_group_count: number;
  type: number;
  status: number;
  ranking_less_reason: string;
  secret_client_comment: string;
  user: IUser;
  observations: IRankingObservation[];
}

export enum EObservationStaff {
  teacher = "100",
  support = "200",
}

export interface IObservationOfficeHour {
  date: string;
  day: string;
  office_hour_id: number;
  time: string;
}
