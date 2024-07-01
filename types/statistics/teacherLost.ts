export interface ITeacherLost {
  amount: string;
  lostStudents: ILost[];
  teachers: ITeacherLostTeacher[];
}

export interface ILost {
  id: number;
  action: number;
  type: number;
  description: string;
  created_at: string;
  status: number;
  leaving_reason: string;
  leaving_category_id: number;
  version_id: number;
  effect_type: number;
  group_detail: IGroupDetail[];
}

export interface IGroupDetail {
  id: number;
  day: string;
  name: string;
  time: string;
  branch: string;
  day_id: number;
  support: string;
  teacher: string;
  time_id: number;
  level_id: number;
  branch_id: number;
  group_form: number;
  group_type: number;
  level_name: string;
  support_id: number;
  teacher_id: number;
  parent_level_id: number;
  parent_level_name: string;
}

export interface ITeacherLostTeacher {
  user_id: number;
  key: number;
  status: number;
  datetime: string;
  hired_date: string;
  nation_id: number;
  family_status: number;
  job_type: number;
  passport_number: string;
  citizenship: string;
  passport_given_date: string;
  passport_expire_date: string;
  passport_given_by: string;
  born_address: string;
  official_address: string;
  live_address: string;
  ielts_score: number;
  candidate_id: number;
}
