import { IUserProfile } from "types/tasks";

import { TParams } from "../common";
import { IUserPhone } from "../userPhone";
import { IFileStorageItem } from "../file";
import { CreateStaffJobType } from "../../constants/settings";

export interface IOptionStringNumber {
  label: string;
  value: number;
}

export interface INation {
  id: number;
  name: string;
  status: number;
}

export enum ITypeStaffWorkingStatus {
  ARCHIVED = 400,
  WORKING = 200,
  REGISTERING = 200,
}

export interface IOptionString {
  label: string;
  value: string;
}

export interface IBranch {
  id: string;
  company_id: string;
  region_id: string;
  name: string;
  address: string | null;
  landmark: string | null;
  latitude: string | number | null;
  longitude: string | number | null;
  description: string | null;
  status: string;
  deleted_at: string | null;
  cover_file_id: string | null;
  type: string;
  key: string | number | null;
  location_url?: string;
}

export interface IRole {
  id: string;
  company_id: string;
  department_id: string;
  name: string;
  type: string;
  degree: string;
  shift_type: string;
  deleted_at: string | null;
  key: string;
  default_route: string;
}

export interface IShift {
  id: number;
  rbac_role_id: number;
  name: string;
  count?: string;
}

export interface IDepartment {
  id: string;
  company_id: string;
  name: string;
  type: string;
  deleted_at: string | null;
  file_id: string | null;
}

export interface IRegisteringCreatedByList {
  balance: number | null;
  created_at: string;
  email: string;
  id: number;
  status: number;
  updated_at: string;
  userProfile: any;
  username: string;
}

export interface ICompanyDetails {
  bank: string;
  company_name: string;
  director: string;
  email: string;
  inn: string;
  mfo: string;
  odek: string;
  p_c: string;
  phone: string;
  place: string;
  post_index: string;
  website: string;
}

export interface ICompanySettings {
  detail: ICompanyDetails;
  id: number;
  name: string;
  payment_mode: string | number | null;
  phone_number: string;
  public_offer_file_id: number | null;
  status: number;
}

export interface IStaffInitialData {
  staffJobTypeList: IOptionStringNumber[];
  userPhoneTypeList: IOptionStringNumber[];
  nationList: INation[];
  company: ICompanySettings;
  createdByList: ICreatedBy[];
  genderList: TParams;
  statusCountList: TParams;
  placeList: IOptionString[];
  citizenList: IOptionString[];
  familyStatusList: IOptionStringNumber[];
  educationPlaceList: IOptionStringNumber[];
  rewardTypeList: IOptionStringNumber[];
  registeringCreatedByList?: IRegisteringCreatedByList[];
  familyMemberList: IOptionStringNumber[];
  branches: IBranch[];
  allBranches: IBranch[];
  roles: IRole[];
  shifts: IShift[];
  departments: IDepartment[];
}

export interface IRegisteringRbacRole {
  id: number;
  name: string;
  type: number;
  degree: number;
  shift_type: number;
  default_route: number;
  company_id: number;
  key: number;
}

export interface IAvatarChildren {
  full_url: string;
  base_url: string;
  path: string;
  resolution: string;
}

export interface IAvatar {
  full_url: string;
  base_url: string;
  path: string;
  children: IAvatarChildren[];
}

export interface IRegisteringUserProfile {
  user_id: number;
  firstname: string;
  middlename: string | null;
  lastname: string;
  locale: string;
  gender: string | number | null;
  description: string | null;
  bio: string | null;
  dob: string | null;
  avatar: IAvatar;
}

export interface IPhone {
  id: number;
  type: number;
  phone_number: string;
  is_confirmed: number;
}

export interface IRegisteringUser {
  id: number;
  username: string;
  email: string;
  status: number;
  created_at: string;
  updated_at: string;
  userProfile: IRegisteringUserProfile;
  passportFront: IEltsFileObj;
  passportBack: IEltsFileObj;
  balance: number | null;
  userPhones: IPhone[];
  ownPhone: IPhone;
}

export interface ICreatedBy {
  balance: null | number;
  created_at: string;
  email: string;
  id: number;
  status: number;
  updated_at: string;
  userProfile: IRegisteringUserProfile;
  username: string;
}

export interface IRegisteringStaff {
  user_id: number;
  key: number;
  status: number;
  datetime: string;
  hired_date: string;
  nation_id: number | null;
  family_status: number | null;
  job_type: number | null;
  passport_number: number | null;
  citizenship: number | null;
  passport_given_date: string | null;
  passport_expire_date: string | null;
  passport_given_by: string | null;
  born_address: string | null;
  official_address: string | null;
  live_address: string | null;
  ielts_score: string | number | null;
  createdBy: ICreatedBy | null;
}

export interface IRegisteringListItem {
  id: number;
  rbac_role_id: number;
  rbac_role_shift_id: number;
  user_id: number;
  branch_type: number;
  rbacRole: IRegisteringRbacRole;
  user: IRegisteringUser;
  staff: IRegisteringStaff;
  is_filled: boolean;
}

export interface IMeta {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
}

export interface IRegisteringData {
  list: IRegisteringListItem[];
  meta: IMeta;
}

export interface IStaffUserProfile {
  user_id: number;
  firstname: string;
  middlename: string | null;
  lastname: string;
  avatar: any;
  locale: string;
  gender: string | null;
  description: string | null;
  bio: string | null;
  dob: string | null;
}

export interface IStaffObj {
  user_id: number;
  key: number;
  status: number;
  datetime: string;
  hired_date: string;
  nation_id: number | null;
  family_status: string | null;
  job_type: number | null;
  passport_number: string | null;
  citizenship: string | null;
  passport_given_date: string | null;
  passport_expire_date: string | null;
  passport_given_by: string | null;
  born_address: string | null;
  official_address: string | null;
  live_address: string | null;
  ielts_score: string | null;
  candidate_id: string | null;
}

export interface IStaffFlow {
  id: number;
  user_id: number;
  type: number;
  start_date: string;
  end_date: string | null;
  department_id: string;
  role_id: string;
  role_shift_id: string | null;
  job_type: string | null;
  created_by: string | null;
}

export interface IRbacRole {
  company_id: number;
  default_route: number;
  degree: number;
  id: number;
  key: number;
  name: string;
  shift_type: number;
  type: number;
}

export interface IStaffFlowL {
  created_by: string | null;
  department_id: number;
  end_date: string | null;
  id: number;
  job_type: string;
  rbacRole: IRbacRole;
  role_id: string;
  role_shift_id: string;
  start_date: string;
  type: number;
  user_id: number;
}

export interface IStaffTabPermissions {
  main_info: boolean;
  academic_info: boolean;
  document: boolean;
  education: boolean;
  family: boolean;
  work_experience: boolean;
  life_cycle: boolean;
}

export interface IRbacAssignmentBranch {
  branch_id: number;
  id: number;
  rbac_assignment_id: number;
  branch: IBranch;
}

export interface IRbacAssignmentObj {
  branch_type: number;
  id: number;
  rbac_role_id: number;
  rbac_role_shift_id: number;
  user_id: number;
  rbacAssignmentBranches: IRbacAssignmentBranch[];
}

export interface IEducationPlace {
  company_id: number;
  degree: number;
  enter_date: string;
  graduate_date: string;
  id: number;
  name: string;
  speciality: string;
  user_id: number;
}

export interface IExperience {
  company_id: number;
  end_date: string;
  id: number;
  organization_name: string;
  position: string;
  start_date: string;
  user_id: number;
}

export interface IFamilyMember {
  degree?: number;
  fio: string;
  phone_number: string;
  position: string;
  user_id: number;
  work_place: string;
}

export interface IEltsFileObj {
  company_id: number;
  file_storage_item_id: number;
  fileStorageItem: IFileStorageItem;
  id: number;
  staff_flow_id: number;
  status: number;
  type: number;
  user_id: number;
}

export interface IPassFrontObj {
  company_id: number;
  fileStorageItem: IFileStorageItem;
  file_storage_item_id: number;
  id: number;
  staff_flow_id: number;
  status: number;
  type: number;
  user_id: number;
}

export interface IStaffViewPageInfoData {
  id: number;
  username: string;
  email: string;
  status: number;
  created_at: string;
  updated_at: string;
  userProfile: IStaffUserProfile;
  balance: string | number | null;
  userPhones: IUserPhone[];
  staff: IStaffObj;
  staff_status: 200 | 300 | 400;
  staffFlow: IStaffFlow;
  staffFlowList: IStaffFlowL[];
  passportFront: IPassFrontObj;
  passportBack: IPassFrontObj;
  ieltsFile: IEltsFileObj;
  jobApplicationFile: any | null;
  jobOrderFile: any | null;
  laborContractFile: any | null;
  selfEmploymentFile: any | null;
  otherFile: any | null;
  userFamilies: IFamilyMember[];
  rbacAssignment: IRbacAssignmentObj;
  userDocuments: any[];
  userEducations: IEducationPlace[];
  userExperiences: IExperience[];
  tabPermissions: IStaffTabPermissions;
  workingHours: string[];
  is_support: boolean;
}

export interface IStaffLifeCycle {
  datetime: string;
  description: string;
  id: number;
  ip_address: any;
  record: any;
  scenario: number;
  unique_id: any;
  data: {
    at_time: string;
    created_by: string;
    device_type: string;
    fired_date: string;
    reason: string;
    role: string;
    staff: string;
    rehired_date: string;
    work_period: {
      end_date: string;
      start_date: string;
    };
  };
  createdBy: {
    balance: number;
    created_at: string;
    email: string;
    id: number;
    status: number;
    updated_at: string;
    userProfile: IUserProfile;
  };
}

export interface IStaffReward {
  amount: number;
  branch_id: number;
  candidate_id: number;
  company_id: number;
  created_at: string;
  hired_date: string;
  given_date: string;
  created_by: number;
  description: string;
  expense_id: number | null;
  id: number;
  referrer: string;
  role_id: number;
  status: string;
  type: number;
  updated_at: string;
  updated_by: number;
  user_id: number;
  vacancy: string;
  actionPermissions: {
    cancel: boolean;
    give: boolean;
    restore: boolean;
  };
  createdBy: {
    balance: number | null;
    created_at: string;
    email: string;
    id: number;
    status: number;
    updated_at: number;
    userProfile: IUserProfile;
  };
  role: {
    company_id: number;
    default_route: number;
    degree: number;
    id: number;
    key: number;
    name: string;
    shift_type: number;
    type: number;
  };
  user: {
    balance: number | null;
    created_at: string;
    email: string;
    id: 133012;
    userPhones: IUserPhone[];
    status: number;
    username: string;
    userProfile: IUserProfile & {
      avatar: {
        full_url: string;
        children: { full_url: string; resolution: string }[];
      };
    };
  };
  bonusFor: {
    balance: null;
    created_at: string;
    email: string;
    id: number;
    status: number;
    updated_at: string;
    username: string;
    userProfile: IUserProfile;
  };
}

export const PASSPORT_FRONT = 100;
export const PASSPORT_BACK = 200;
export const IELTS = 300;
export const JOB_APPLICATION = 400;
export const JOB_ORDER = 500;
export const JOB_REPOSITION_ORDER = 550;
export const LABOR_CONTRACT = 600;
export const DISMISSAL_APPLICATION = 700;
export const DISMISSAL_ORDER = 800;
export const SELF_EMPLOYMENT = 900;
export const OTHER = 1000;

export const FILES_TYPES = {
  PASSPORT_FRONT: 100,
  PASSPORT_BACK: 200,
  IELTS: 300,
  JOB_APPLICATION: 400,
  JOB_ORDER: 500,
  JOB_REPOSITION_ORDER: 550,
  LABOR_CONTRACT: 600,
  DISMISSIAL_APPLICATION: 700,
  DISMISSIAL_ORDER: 800,
  SELF_EMPLOYMENT: 900,
  OTHER: 1000,
};

export const STAFF_FILE_TYPES = {
  100: "Passport front",
  200: "Passport back",
  300: "IELTS",
  400: "Job Application",
  500: "Job Order",
  550: "Job Reposition Order",
  600: "Labor Contract",
  700: "Dismissial Application",
  800: "Dismissial Order",
  900: "Self Employment",
  1000: "Other file",
};

export const REQUIRED_DOCUMENTS = {
  [CreateStaffJobType.official]: [
    "PASSPORT_FRONT",
    "PASSPORT_BACK",
    "JOB_APPLICATION",
    "JOB_ORDER",
    "LABOR_CONTRACT",
  ],

  [CreateStaffJobType.selfEmployment]: [
    "PASSPORT_FRONT",
    "PASSPORT_BACK",
    "SELF_EMPLOYMENT",
    "LABOR_CONTRACT",
  ],

  [CreateStaffJobType.nonOfficial]: [
    "PASSPORT_FRONT",
    "PASSPORT_BACK",
    "LABOR_CONTRACT",
  ],
};

export const REQUIRED_DOCUMENTS_BY_STATUS = {
  WORK_TYPE_NON_WORKING: ["DISMISSIAL_APPLICATION", "DISMISSIAL_ORDER"],
};
