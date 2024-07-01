import { IAvatar } from "../tasks";
import { IUserProfile } from "../userProfile";
import { IUserPhone } from "../userPhone";
import { TBranch } from "../branch";
import { IGroup } from "../group";
import { EObservationStaff, IRankingObservation } from "../observation";
export enum ETeacherClass {
  A = 100,
  B = 200,
  C = 300,
}
export interface IAcademicControlResponse {
  data: IAcademicControl[];
  homeWorkNotDoneByDay: { date: string; count: string }[];
  total_count: number;
}
export interface IAcademicControl {
  user_id: string;
  firstname: string;
  lastname: string;
  avatar_url: string;
  avatar: any;
  branch: string;
  count: string;
}

export interface IAcademicControlRedListGroup {
  group_id: string;
  name: string;
  level: string;
  parent_level: string;
  count: string;
}

export interface IControlAttendanceResponse {
  data: IControlAttendanceData[];
  missedByDay: IControlAttendanceMissedByDay;
  total_count: number;
}

export interface IControlAttendanceData {
  user_id: number;
  firstname: string;
  lastname: string;
  avatar_url: string;
  avatar: any;
  phones: {
    id: number;
    is_confirmed: number;
    phone_number: string;
    type: number;
  }[];
  branch: string;
  groups: IControlAttendanceGroup[];
  count: number;
}

export interface IControlAttendanceGroup {
  group_id: number;
  name: string;
  level: string;
  parent_level: string;
  count: number;
}

export interface IControlAttendanceMissedByDay {
  [key: string]: number;
}

export interface IArsProgressGroup {
  id: number;
  group_id: number;
  progress: number;
  month: number;
  year: number;
  pass_rate: number;
  branch: TBranch;
  group: IGroup;
  parentLevel: {
    id: number;
    name: string;
    order: number;
    children: {
      id: number;
      name: string;
      order: number;
      children: [];
      parent_id: number;
      data: {
        has_exam: boolean;
        should_assign_units: boolean;
        calculate_unit_progress: boolean;
      };
    }[];
    parent_id: string;
    data: {
      has_exam: boolean;
      should_assign_units: boolean;
      calculate_unit_progress: boolean;
    };
  };
  level: {
    id: number;
    name: string;
    order: number;
    children: [];
    parent_id: number;
    data: {
      has_exam: boolean;
      should_assign_units: boolean;
      calculate_unit_progress: boolean;
    };
  };
  lessonDay: {
    id: number;
    name: string;
  };
  lessonTime: {
    id: number;
    time: string;
    duration: string;
  };
}
export interface IArsProgress {
  users: IArsUserProfile[];
  count: IProgressCount;
  avg: number;
}

export interface IArsUserProfile {
  id: number;
  userProfile: IUserProfile & {
    full_avatar: IUserProfile["avatar"];
    phones: IUserPhone[];
  };
  group_count: number;
  progress: number;
}

export interface IProgressCount {
  teacher: string;
  support: string;
  avg: string;
}

export interface IRanking {
  id: number;
  mentor_id: number;
  base_mentor_id: number;
  studentComments: string | null;
  year: number;
  ranking_less_reason?: string;
  month: number;
  type: EObservationStaff;
  status: string;
  updated_at: string;
  order: number;
  class: number;
  overall: number;
  norma: number;
  lost_count: number;
  exam_norma: number;
  exam_total: number;
  group_count: number;
  real_group_count: number;
  academic_director_comment: string;
  secret_client_comment: string;
  student_count: number;
  exam_failed_count: number;
  exam_group_count: number;
  branch_id: number;
  progress_total: number;
  lost_total: number;
  offence_total: number;
  mentor: IRankingMentor;
  observations: IRankingObservation[];
  offence: {
    id: number;
    name: string;
    count: number;
    percent: number;
  }[];
  progress_group: {
    id: number;
    name: string;
    progress: number;
    pass_rate: number;
  }[];
}

export interface IRankingMentor {
  id: number;
  username: string;
  auth_key: string;
  access_token: string;
  password_hash: string;
  oauth_client: any;
  oauth_client_user_id: any;
  email: string;
  status: number;
  created_at: number;
  updated_at: number;
  logged_at?: number;
  base_user_id: number;
  student_id: any;
  company_id?: number;
  userProfile: IRankingUserProfile;
}

export interface IRankingChart {
  date: string;
  progress_total: string;
  lost_total: string;
  offence_total: string;
  overall: string;
}
export interface IRankingUserProfile {
  fullName: string;
  avatar: IAvatar;
}

export interface IPotentialFail {
  data: IPotential[];
}

export interface IPotential {
  user_id: string;
  firstname: string;
  type: string;
  lastname: string;
  branch: string;
  count: string;
  userProfile: IPotentialUserProfile;
}

export interface IPotentialUserProfile {
  user_id: string;
  firstname: string;
  middlename: any;
  lastname: string;
  locale: string;
  gender: string;
  company_id?: string;
  description: any;
  bio: any;
  dob: string;
  avatar_file_id: string;
  avatarFile: IPotentialAvatarFile;
}

export interface IPotentialAvatarFile {
  id: string;
  component: string;
  base_url: string;
  path: string;
  type: string;
  size?: string;
  name: string;
  upload_ip?: string;
  created_at: string;
  parent_id: any;
  resolution: string;
  location_type: any;
  source_path: any;
  children: IPotentialChildren[];
}

export interface IPotentialChildren {
  id: string;
  component: string;
  base_url: string;
  path: string;
  type: string;
  size: any;
  name: string;
  upload_ip: any;
  created_at: string;
  parent_id: string;
  resolution: string;
  location_type: any;
  source_path: any;
}
