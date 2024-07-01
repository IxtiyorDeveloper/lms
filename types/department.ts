import { TStatuses } from "./general";
import { IShift } from "./role";
import { IRbacAssignment } from "./userMe";
import { IFile } from "./file";

export interface IDepartment {
  id: number;
  company_id: number;
  name: string;
  type: 100 | 200;
  deleted_at: string;
  rbacRoles: IRbacRole[];
  rbacAssignmentCount: string;
  file: IFile;
}

export interface IRbacRole {
  id: number;
  name: string;
  type: 100 | 200;
  degree: 100 | 200 | 300;
  shift_type: number;
  rbacAssignmentCount: string;
  department: IDep;
  shifts?: IShift;
  department_id: string;
  rbacAssignments?: IRbacAssignment[];
}
export type IDep = {
  id: number;
  name: string;
  type: TStatuses;
};
