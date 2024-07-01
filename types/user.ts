import { IStudent } from "./student";
import { UserLabel } from "./userLabel";
import { IUserPhone } from "./userPhone";
import { IUserProfile } from "./userProfile";
import { IContactResponsibles } from "./contactResponsibles";
import { RbacAssignment } from "./rbacAssignment";
import { IStaff } from "./statistics";
import { StudentStat } from "./general";

export interface IUser {
  id?: number;
  balance: number;
  age?: number;
  username: string;
  fullName: string;
  is_freshman?: boolean;
  freshman_count?: number | string;
  branchIds: string[];
  email: string;
  status: StudentStat;
  created_at: string;
  student?: IStudent;
  userLabels?: UserLabel[];
  userPhones?: IUserPhone[];
  userProfile?: IUserProfile;
  contactResponsibles?: IContactResponsibles[];
  rbacAssignment?: RbacAssignment;
  staff?: IStaff;
  is_support: boolean;
  workingHours: string[];
  lead_register_count: string;
}
export enum EUser {
  S100 = 100,
  S200 = 200,
  S300 = 300,
  S400 = 400,
}
