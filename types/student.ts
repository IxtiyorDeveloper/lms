import { TStatuses } from "./general";
import { ICourse } from "./course";
import { ILevel } from "./level";
import { TGroupType } from "./groupType";
import { TBranch } from "./branch";
import { TList, TSource } from "./hooks";
import {
  IContacts,
  IStudentAccountActions,
  IStudentAccountLabels,
} from "./contact";
import { ITimes } from "./times";
import { IUser } from "./user";
import { TParams } from "./common";
import { IScoreUnit, IStudentScores } from "./ars/teacher";
import { IGroup } from "./group";
import { IBranch } from "./staffSettings";
import { IDay } from "./day";

export interface IStudent {
  user_id: number;
  note: string;
  status: 200 | 100 | 300;
  type: 200 | 100 | 300;
  permissionLabels?: TParams;
  buttonActions?: TParams;
  source_id: number;
}

export interface OneStudent {
  user_id: number;
  countGivenBooksOnThisLevel: number;
  note: string;
  status: TStatuses;
  finish_date: TStatuses;
  type: TStatuses;
  branch_id: number;
  source_id: number;
  isBlackList?: boolean;
  course: ICourse;
  level: ILevel;
  groupType: TGroupType;
  branch: TBranch;
  source: TSource;
  currentGroupContact: IContacts;
  preferDays: IPreferDays[];
  preferTimes: IPreferTime[];
  permissionLabels: IStudentAccountLabels;
  user: IUser;
  buttonActions: IStudentAccountActions;
  name?: string;
  userScore?: IStudentScores;
  studiedGroups: IGroup[] | undefined;
  group?: IGroup;
  stationaryHistory?: IStationaryHistoryData;
  dividedBalance: TList["dividedBalance"];
  preferBranches: IPreferBranches[];
  preferMentors: IPreferMentors[];
  strictPreferences: TParams;
  startDateLabel: any;
}

export interface IPreferMentors {
  id: number;
  type: string;
  mentor: IUser;
}

export interface IPreferTime {
  id: number;
  type: string;
  time: ITimes;
}

export interface IPreferBranches {
  id: number;
  type: string;
  branch: IBranch;
}

export interface IPreferDays {
  id: number;
  type: string;
  day: IDay;
}

export interface ArsStudentData {
  user_id: number;
  first_name: string;
  last_name: string;
  current_unit_id: number;
  current_activity: ICurrentActivity;
  points: number;
  coins: number;
  level: ILevel;
  avatar: string;
  language: string;
  intro_watched: boolean;
  avatar_uploaded: boolean;
  added_words_count: number;
  passed_words_count: number;
  failed_words_count: number;
}

export interface ICurrentActivity {
  id: number;
  name: string;
}

export interface IStudentOrder {
  id: number;
  count: number;
  price: number;
  balance: number;
  status: number;
  created_at: number;
  received_at: any;
  comment: any;
  option: IStudentOrderOption;
}

export interface IStudentOrderOption {
  id: number;
  count: number;
  price: number;
  product: IStudentOrderProduct;
  properties: IStudentOrderProperty[];
}

export interface IStudentOrderProduct {
  id: number;
  name: string;
  price: number;
  count: number;
  description: string;
  images: IStudentOrderImage[];
}

export interface IStudentOrderImage {
  original: string;
  medium: string;
  small: string;
}

export interface IStudentOrderProperty {
  key: string;
  value: string;
}

export interface IStudentEvent {
  id: number;
  name: string;
  title: string;
  description: string;
  finish_text: string;
  close_text: string;
  started_at: string;
  branch: IStudentEventBranch;
  img_url: string;
  img_url2: string;
  max_free_seat_count: any;
  event_posts: any;
  is_reg_this_user: boolean;
  available: boolean;
  registered_users: IStudentEventRegisteredUser[];
  count_reg_students: number;
}

export interface IStudentEventBranch {
  id: number;
  name: string;
}

export interface IStudentEventRegisteredUser {
  avatar_url?: string;
  firstname: string;
  lastname: string;
}

export interface IStudentProgress {
  id: number;
  name: string;
  points: number;
  coins: number;
  order: number;
  system_order: number;
  level: ILevel;
  sub_units: IStudentProgressSubUnit[];
}

export interface IStudentSkill {
  id: number;
  name: string;
  total: number;
  passed: number;
}

export interface IStudentProgressSubUnit {
  id: number;
  name: string;
  points: number;
  coins: number;
  order: number;
  system_order: number;
  level: ILevel;
  opening_date: any;
  student_score: IStudentProgressStudentScore;
}

export interface IStudentProgressStudentScore {
  id: number;
  passed: number;
  opened: number;
  unit_id: number;
  user_id: number;
  is_populated: number;
  collected_points: number;
  total_points: number;
  collected_coins: number;
  total_coins: number;
  used_key: number;
  total_key: number;
  availableKey: number;
  scores: IStudentProgressScore[];
}

export interface IStudentProgressScore {
  passed: number;
  collected_points: number;
  total_points: number;
  collected_coins: number;
  total_coins: number;
  activity: IStudentProgressActivity;
}

export interface IStudentProgressActivity {
  id: number;
  name: string;
}

export interface IStudentExam {
  id: number;
  year: string;
  month: string;
  level_id: number;
  branch_id: number;
  status: number;
  group_id: number;
  group: IStudentExamGroup;
  exam_parts: IStudentExamExamPart[];
}

export interface IStudentExamGroup {
  id: number;
  name: string;
  teacher_id: number;
  support_id: number;
  units_start_date: string;
  units_finish_date: string;
  sub: IStudentExamSub;
  level: IStudentExamLevel;
  group_form: number;
}

export interface IStudentExamSub {
  id: number;
  name: string;
}

export interface IStudentExamLevel {
  id: number;
  name: string;
}

export interface IStudentExamExamPart {
  id: number;
  date: string;
  time: string;
  room_id: number;
  branch_id: number;
  config: IStudentExamConfig;
}

export interface IStudentExamConfig {
  id: number;
  type: number;
  name: string;
  components: IStudentExamComponent[];
}

export interface IStudentExamComponent {
  id: number;
  exam_part_id: number;
  key: number;
  max_point: number;
  deleted_at: any;
  recommended_time: number;
  recommendation: any;
  order: number;
  task_progress: number;
  template_progress: number;
  label: string;
  image_url: string;
}

export interface IStudentTopic {
  id: number;
  name: string;
  parent_topic_id: any;
  coverage: IStudentTopicCoverage;
  sub_topics: IStudentTopicSubTopic[];
}

export interface IStudentTopicCoverage {
  original: string;
  medium: string;
  small: string;
}

export interface IStudentTopicSubTopic {
  id: number;
  name: string;
  parent_topic_id: number;
  coverage: IStudentTopicCoverage2;
  words_count: number;
  student_info: IStudentTopicStudentInfo;
}

export interface IStudentTopicCoverage2 {
  original: string;
  medium: string;
  small: string;
}

export interface IStudentTopicStudentInfo {
  passed_topic_words: number;
}

export interface IStationaryHistoryData {
  "100": IStationaryHistory;
  "200": IStationaryHistory;
}

export interface IStationaryPaymentData {
  "100": IStationaryHistoryList[];
  "200": IStationaryHistoryList[];
}

export interface IStationaryHistory {
  canGet: boolean;
  list: IStationaryHistoryList[];
}

export interface IStationaryHistoryList {
  id: number;
  level_id: number;
  stock_product_id: number;
  type: number;
  given_date: string;
  givenBy: IUser;
  canCancel: boolean;
}

export interface IStudentProfileObjExamComponent {
  id: number;
  exam_part_id: number;
  key: number;
  max_point: number;
  deleted_at: string | null;
  recommended_time: number;
  recommendation: string | null;
  order: number;
  point?: number;
  task_progress: number;
  template_progress: number;
  label: string;
  image_url: string;
}

export interface IStudentExamObj {
  id: number;
  year: string;
  month: string;
  level_id: number;
  branch_id: number;
  status: number;
  group_id: number;
  is_checked: boolean | null;
  type: number;
  group: {
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
  };
  exam_parts: {
    id: number;
    date: string;
    time: string;
    room_id: number;
    branch_id: number;
    config: {
      id: number;
      type: number;
      name: string;
      components: IStudentProfileObjExamComponent[];
    };
    capacity: string | null;
  }[];
  level: {
    id: number;
    name: string;
    order: number;
    children: {
      id: number;
      name: string;
      order: number;
      children: any[];
      parent_id: number;
      data: {
        has_exam: boolean;
        should_assign_units: boolean;
        calculate_unit_progress: boolean;
      };
    }[];
    parent_id: number | null;
    data: {
      has_exam: boolean;
      should_assign_units: boolean;
      calculate_unit_progress: boolean;
    };
  };
  subLevel: {
    id: number;
    name: string;
    order: number;
    children: any[];
    parent_id: number;
    data: {
      has_exam: boolean;
      should_assign_units: boolean;
      calculate_unit_progress: boolean;
    };
  };
}

export interface IStudentExamProcess {
  id: number;
  status: number;
  comment: string | null;
  attendance_status: number;
  is_student_viewed: number;
  point: number;
  pass_point: number;
  data: {
    scores: {
      point: number;
      status: number | null;
      part_id: number;
      task_id: number;
      criteria: {
        id: number;
        point: number;
      }[];
      group_id: number;
      max_point: number;
      description: string;
      component_id: number;
    }[];
    max_point: number;
    pass_point: number;
    start_time: number;
    components: {
      id: number;
      point: number;
      part_id: number;
      component_id: number;
    }[];
    attendance: {
      id: number;
      status: number;
    }[];
    recommended_time: number;
  };
}

export interface IStudentProfileExam {
  id: number;
  exam_id: number;
  part_id: null;
  type: number;
  user_id: number;
  current_group_id: number | null;
  group_contact_status: number | null;
  deleted_at: string | null;
  process_id: number;
  exam: IStudentExamObj;
  process: IStudentExamProcess;
}
