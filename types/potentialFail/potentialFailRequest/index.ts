import { IUser } from "../../user";
import { IGroup } from "../../group";

export interface IPotentialFailRequest {
  deadline: string;
  created_at: string;
  doneReviewersCount: number;
  id: number;
  notDoneReviewersCount: number;
  staff_type: number;
  status: number;
  allReviewersCount: number;
  createdBy: IUser;
}

export enum EPotentialFailRequestStatus {
  PENDING = 100,
  PROCESSING = 200,
  FINISHED = 300,
}
export enum EPotentialFailTypeOfRequest {
  FALLIBLE = 200,
}
export enum EPotentialFailStaffType {
  TEACHER = 100,
  SUPPORT = 200,
  TEACHER_AND_SUPPORT = 300,
}

export interface ISinglePotentialFailRequest {
  created_at: string;
  deadline: string;
  id: number;
  staff_type: number;
  status: number;
  fallibleReviews: IPotentialFailReview[];
}

export interface IPotentialFailReview {
  id: number;
  allReviewersCount: number;
  doneReviewersCount: number;
  group_id: string;
  status: string;
  student_id: number;
  reviewer: IUser;
}

export interface IPotentialFailReviewerGroup {
  groupStatus: EPotentialFailGroupStatus;
  group_id: number;
  status: number;
  student_id: number;
  group: IGroup;
}
export enum EPotentialFailGroupStatus {
  NOT_DONE = 100,
  DONE = 200,
}
export enum EPotentialFailRequestAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}
