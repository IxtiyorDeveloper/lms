import { IUser } from "./user";
import { TStatuses } from "./general";
import { IRbacAssignmentBranch } from "./staffSettings";

export interface RbacAssignment {
  id: number;
  branch_type: number;
  rbacRole: IRbackRole;
  rbacRoleShift: IRbacRoleShift;
  user?: IUser;
  user_id?: number;
  rbacAssignmentBranches: IRbacAssignmentBranch[];
}

export interface IRbacRoleShift {
  name: string;
}
export interface IRbackRole {
  id: number;
  name: string;
  key: string | number;
  type: TStatuses;
  degree: TStatuses;
  shift_type: null;
}
