import { IUser } from "../../user";
import { IGroup } from "../../group";
import { ILessonDay } from "../../lessonDay";

export interface IPodoRequest {
  deadline: string;
  created_at: string;
  doneReviewersCount: number;
  id: number;
  notDoneReviewersCount: number;
  staff_type: number;
  status: number;
  allReviewersCount: number;
  createdBy: IUser;
  type: EPodoTypeOfRequest;
  lessonDay: ILessonDay;
}

export enum EPodoTypeOfRequest {
  PODO = 100,
  PODO_ABSENT = 110,
}

export enum EPodoRequestStatus {
  PENDING = 100,
  PROCESSING = 200,
  FINISHED = 300,
}

export enum EStaffType {
  TEACHER = 100,
  SUPPORT = 200,
  TEACHER_AND_SUPPORT = 300,
}

export interface ISinglePodoRequest {
  created_at: string;
  deadline: string;
  id: number;
  staff_type: number;
  status: number;
  podoReviews: IPodoReview[];
}

export interface IPodoReview {
  id: number;
  allReviewersCount: number;
  doneReviewersCount: number;
  group_id: string;
  status: string;
  student_id: number;
  reviewer: IUser;
}

export interface IReviewerGroup {
  groupStatus: EPodoGroupStatus;
  group_id: number;
  status: number;
  student_id: number;
  group: IGroup;
}
export enum EPodoGroupStatus {
  NOT_DONE = 100,
  DONE = 200,
}
export enum EPodoRequestAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}
