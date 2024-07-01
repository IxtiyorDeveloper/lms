import { TWaitingList } from "../hooks";
import { IStudentAccountActions } from "../contact";

export interface ILostItem {
  user_id: number;
  note: string;
  status: number;
  type: number;
  branch_id: number;
  source_id: number;
  user: TWaitingList;
  permissionActions: IStudentAccountActions;
}
