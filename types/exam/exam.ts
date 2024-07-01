import { IUserProfile } from "types/userProfile";
import { TUser } from "../hooks";
import { IUser } from "../user";
import { IExamTaskData } from "./index";
import { GetExerciseTDO } from "types/exercise";

export interface IExam {
  id: number;
  year: string;
  month: string;
  level_id: number;
  branch_id: number;
  status: number;
  group_id: number;
  group: IExamGroup;
  exam_parts: IExamPart[];
  teacher: TUser;
  support: TUser;
  supervisor: any;
  students: IExamStudent[];
  exam_device_pack: {
    current: {
      count: string;
      deleted_at: string;
      id: number;
      name: string;
      order: number;
    };
    old: {
      branch_id: number;
      config: { id: number; type: number; name: string };
      id: number;
      name: string;
      type: number;
      date: string;
      room_id: number;
      time: string;
    };
  };
}

export interface IExamGroup {
  group_form: number;
  id: number;
  branch: {
    id: number;
    name: string;
  };
  lessonDay: {
    id: number;
    name: string;
  };
  lessonTime: {
    id: number;
    time: string;
  };
  sub: {
    id: number;
    name: string;
  };
  level: {
    id: number;
    name: string;
  };
  room: {
    id: number;
    name: string;
  };
  name: string;
  support_id: number;
  teacher_id: number;
  units_finish_date: string;
  units_start_date: string;
}

export interface IMockExamGroup {
  id: number;
  name: string;
  teacher_id: number;
  support_id: number;
  units_start_date: string;
  units_finish_date: string;
  sub: {
    id: number;
    name: string;
  };
  level: {
    id: number;
    name: string;
  };
  group_form: number;
  room: {
    id: number;
    name: string;
    branch: {
      id: number;
      name: string;
    };
  };
  lessonDay: {
    id: number;
    name: string;
    weeks: string[];
  };
  lessonTime: {
    id: number;
    time: string;
    duration: null;
  };
  teacher: {
    id: number;
    userProfile: IMockExamUserProfile;
    studentProfile: null;
  };
  support: {
    id: number;
    userProfile: IMockExamUserProfile;
    studentProfile: null;
  };
  mockStats: {
    total_students: number;
    failed_students: number;
    passed_students: number;
    not_done_students: number;
    processing_count: number;
  };
}

export interface IMockExamUserProfile {
  locale: string;
  avatar: string;
  lastname: string;
  firstname: string;
}

export interface IExamPart {
  id: number;
  date: string;
  time: string;
  room_id: number;
  branch_id: number;
  config: IExamConfig;
}

export interface IExamConfig {
  id: number;
  type: number;
  name: string;
  components: IExamComponent[];
}

export interface IExamComponent {
  id: number;
  exam_part_id: number;
  key: number;
  max_point: number;
  deleted_at: any;
  recommended_time: number;
  recommendation: any;
  order?: number;
  task_progress: number;
  template_progress: number;
  label: string;
  image_url: string;
}

export interface IExamStudent {
  id: number;
  exam_id: number;
  part_id: any;
  type: number;
  user_id: number;
  user: IExamUser;
  process: IExamProcess;
}

export interface IExamUser {
  id: number;
  studentProfile: IExamStudentProfile;
}

export interface IExamStudentProfile {
  first_name: string;
  last_name: string;
  current_unit_id: number;
  current_activity: IExamCurrentActivity;
  points: number;
  coins: number;
  level: number;
  avatar: string;
  language: string;
}

export interface IExamCurrentActivity {
  id: number;
  name: string;
}

export interface IExamProcess {
  id: number;
  status: number;
  comment: any;
  attendance_status: number;
  data: IExamData;
  needCheckEssay: INeedCheckEssay;
  changeComment: IExamChangeComment;
  point: number;
  pass_point: number;
}

export interface IExamChangeComment {
  id: number;
  responsible_id: number;
  process_id: number;
  action_id: number;
  description: string;
  options: string;
  created_at: string;
  responsible: IUser;
}

export interface IExamData {
  scores: any[];
  max_point: number;
  pass_point: number;
  start_time: number;
  components: any[];
  attendance: any[];
  recommended_time: number;
}

export interface IExamPermissions {
  marking: IExamMarking[];
  attendance: IExamAttendance[];
}

export interface IExamMarking {
  label: string;
  component_id: number;
  can: boolean;
}

export interface IExamAttendance {
  label: string;
  type: number;
  can: boolean;
}

export interface IExamPageData {
  year: string;
  month: string;
  groups: IExamPageDataGroup[];
  teachers: IExamPageDataTeacher[];
  supports: IExamPageDataSupport[];
  supervisors: IExamPageDataSupervisor[];
}

export interface IExamPageDataGroup {
  id: string;
  name: string;
}

export interface IExamPageDataTeacher {
  base_user_id: string;
  firstname: string;
  lastname: string;
}

export interface IExamPageDataSupport {
  base_user_id: string;
  firstname: string;
  lastname: string;
}

export interface IExamPageDataSupervisor {
  base_user_id: string;
  firstname: string;
  lastname: string;
}

export interface INeedCheckEssay {
  id: 168728;
  data: {
    taskData: IExamTaskData;
  };
  point: number;
  part_id: number;
  process_id: number;
  component_id: number;
  max_point: number;
  task_type: number;
  description: string;
  point_status: number;
  criteria_mark: string;
  responsible_id: number;
  responsible: IUser;
}

export interface IExamTeacherAverage {
  avatar: string;
  average: string;
  exam: string;
  full_avatar: string;
  name: string;
  user_id: string;
}

export interface IMockExamDataTeacherData {
  average: any;
  user_id: string;
  name: string;
  avatar: string;
  full_avatar: string;
}
export interface IExamStatistics {
  all_count: string;
  full_finished_count: string;
  speaking_count: string;
  main_count: string;
}

export interface IExamStats {
  attendance: {
    full_absents: number;
    partial_absents: number;
  };
  students: {
    failed_students: number;
    not_checked_students: number;
    total_students: number;
    conditional_students: number;
    passed_students: number;
  };
  average: number;
  componentAverage: IExamStatsAverageComponent[];
}
export interface IMockExamStats {
  avg_score: number;
  levels: IExamStatsLevel[];
  average: number;
  componentAverage: IExamStatsAverageComponent[];
  students: {
    total_students: number;
    passed_students: number;
    failed_students: number;
    conditional_students: number;
    not_checked_students: number;
    processing_count: number;
    not_done_students: number;
    partial_absents: number;
    full_absents: number;
  };
}

export interface IExamUser {
  id: number;
  exam_id: number;
  part_id: number;
  type: number;
  user_id: number;
  current_group_id: number;
  group_contact_status: number;
  deleted_at: string;
  process_id: number;
  process: IExamProcess;
}

export interface IExamStatsAverage {
  components: IExamStatsAverageComponent[];
  average: string;
}
export interface IMNockExamStatsAverageComponent {
  score: string;
  name: string;
}

export interface IExamStatsAverageComponent {
  average: string;
  max_point: string;
  key: string;
}
export interface IMNockExamStatsAverageComponent {
  score: string;
  name: string;
}

export interface IExamStatsLevel {
  level: number;
  total_exams_count: string;
  checked_exams_count: string;
}

export interface IMockExamDataGroupStudents {
  id: number;
  exam_id: number;
  part_id: any;
  type: number;
  user_id: number;
  current_group_id: number;
  group_contact_status: number;
  studentProfile: IMockExamDataGroupStudentsStudentProfile;
}

export interface IMockExamDataGroupStudentsStudentProfile {
  first_name: string;
  last_name: string;
  current_unit_id: number;
  current_activity: CurrentActivity;
  points: number;
  coins: number;
  level: number;
  avatar: string;
  language: string;
  fullAvatar: any;
  level_name: string;
  mockExam: IMockExamStudentResult;
}

export interface IMockExamStudentResult {
  duration: number;
  finished_at: number;
  id: number;
  left_duration: number;
  locked: boolean;
  max_score: number;
  order: number;
  passed: 1 | 0 | null;
  paused_at: number;
  score: number;
  started_at: number;
  status: number;
  updated_at: string;
  base_user_id: number;
  created_at: string;
  dataResult: IExamStudenResult;
}

export interface IExamStudenResult {
  paper: IExamStudenPaper[];
  max_point: number;
  pass_point: number;
  stop_time: string;
  recommended_time: string;
  scores: {
    component_id: number;
    criteria: CreteriaTDO[];
    description: string;
    group_id: number;
    max_point: number;
    part_id: number;
    point: number;
    status: any;
    task_id: number;
  }[];
  components: IExamStudenPaperComponent[];
}

export interface IExamStudenPaperComponent {
  icon_url: string;
  id: number;
  label: string;
  point: number;
  recommendation: string;
  recommended_time: number;
  result_point: number;
  type: number;
  groups: IExamStudenPaperComponentGroup[];
}

export interface IExamStudenPaperComponentGroup {
  variant_order: number;
  id: number;
  point: number;
  tasks: GetExerciseTDO[];
}

export type CreteriaTDO = {
  criteria: {
    description: string;
    icon_id: number;
    icon_url: string;
    id: number;
    name: string;
  };
  criteria_id: number;
  id: number;
  point: number;
  task_id: number;
  point_result?: number;
};

export interface IExamStudenPaper {
  icon_url: string;
  id: number;
  label: string;
  point: number;
  recommended_time: number;
  type: number;
  components: IExamStudenPaperComponent[];
}

export interface CurrentActivity {
  id: number;
  name: string;
}

export interface IMockExamGroupStudentListGroup {
  id: number;
  year: string;
  month: string;
  level_id: number;
  branch_id: number;
  status: number;
  group_id: number;
  is_checked: any;
  group: IMockExamGroupInside;
  exam_parts: IMockGroupExamPart[];
  teacher: IMockGroupTeacher1;
  support: IMockGroupTeacher1;
}

export interface IMockExamGroupInside {
  id: number;
  name: string;
  teacher_id: number;
  support_id: number;
  units_start_date: string;
  units_finish_date: string;
  sub: INameId;
  level: INameId;
  group_form: number;
  room: IMockGroupRoom;
  branch: INameId;
  lessonDay: IMockGroupLessonDay;
  exam_parts: any[];
}

export interface INameId {
  id: number;
  name: string;
}

export interface IMockGroupRoom extends INameId {
  branch: INameId;
}

export interface IMockGroupLessonDay extends INameId {
  weeks: string[];
}

export interface IMockGroupExamPart {
  id: number;
  date: string;
  time: string;
  room_id: number;
  branch_id: number;
  config: IMockGroupConfig;
}

export interface IMockGroupConfig {
  id: number;
  type: number;
  name: string;
  components: IMockGroupComponent[];
}

export interface IMockGroupComponent {
  id: number;
  exam_part_id: number;
  key: number;
  max_point: number;
  deleted_at: any;
  recommended_time: number;
  recommendation?: string;
  order: number;
  task_progress: number;
  template_progress: number;
  label: string;
  image_url: string;
}

export interface IMockGroupTeacher1 {
  id: number;
  userProfile: IUserProfile;
  studentProfile: null;
}
export enum EMockAttemptConfig {
  MOCK_MAX_ATTEMPT = 3000,
  MOCK_ATTEMPT_PER_DAY = 3100,
  MOCK_START_DATE = 3200,
  MOCK_END_DATE = 3300,
}
