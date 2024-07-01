import { IUser } from "./user";
import { IRbacRole } from "./department";
import { IActualSalary, IAggregated, StaffStatus } from "./finance/salary";
import { TStatuses } from "./general";
import { TBranch } from "./branch";
import { IContacts } from "./contact";
import { IGroup } from "./group";
import { TParams } from "./common";

interface IStaffActionPermissions {
  activate: boolean;
  call: boolean;
  create: boolean;
  dismissal: boolean;
  edit: boolean;
  "edit-candidate-details": boolean;
  reposition: boolean;
  sms: boolean;
}

export interface TAssignment {
  id: number;
  total_salary: string;
  avans: string;
  penalty: number;
  tax: string;
  card: string;
  cash: string;
  year: string;
  month: string;
  isGiven: boolean;
  receiver_id: number;
  amount_status: number;
  staff_status: number;
  kpi: number;
  fixed_salary: number;
  experience: number;
  role_id: number;
  shift_id: number;
  difference_last_month_salary: number;
  receiver: IUser;
  groupCounts: TGroupCount;
  salaryComponents: IAggregated[];
  details: ISalaryDetails;
  actualSalary: IActualSalary;
}

export interface TGroupCount {
  [key: string]: number;
}

export interface IAssignment {
  id: number;
  branch_type: TStatuses;
  rbacRole: IRbacRole;
  rbacRoleShift: any;
  user: IUser;
  rbac_role_id: 1;
  rbac_role_shift_id: null | string | number;
  user_id: 1;
  actualSalary: IActualSalary;
  staffStatus: StaffStatus;
  actionPermissions: IStaffActionPermissions;
  rbacAssignmentBranches?: {
    branch_id: number;
    id: number;
    rbac_assignment_id: number;
    branch?: TBranch;
  }[];
  staff: {
    user_id: number;
    key: TStatuses;
    status: TStatuses;
    datetime: string;
    hired_date: string;
  };
  groupCount: IGroupCount;
}

export interface IGroupCount {
  group: string;
  individual: number;
}

export interface ISupportTimeTable {
  [key: string]: {
    [key: string]: IObjTimeTable;
  };
}

export interface IObjTimeTable {
  type: number;
  exam: {
    id: number;
    group: IGroup;
  };
  officeHour: IOfficeHour;
}

export interface IOfficeHour {
  id: number;
  time: string;
  date: string;
  comment: null | string;
  activeOfficeHourCandidates: IActiveOfficeHourCandidate[];
}

export interface IActiveOfficeHourCandidate {
  id: number;
  topic: null | string;
  status: number;
  groupContact: IContacts;
}

export interface ISalaryDetails {
  range: IRange;
  groupForms: { [key: string]: ISalaryGroupForm };
  groupCounts: TParams;
}
export interface ISalaryGroupForm {
  range: IRange;
  groups: IGroup[];
}
export interface IRange {
  max: number | null;
  min: number | null;
}
