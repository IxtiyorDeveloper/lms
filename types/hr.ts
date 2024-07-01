import { CandidateStages, CandidateStatus } from "constants/hr";
import { IFetchList, TStatuses } from "./general";
import { IUserProfile } from "./tasks/index";
import { IUserPhone } from "./userPhone";
import { IBranch } from "./staffSettings";

export interface IConfigVacancy {
  role_id: number;
  role_name: string;
  department: {
    id: number;
    name: string;
    type: number;
  };
  id: number;
  status: number;
}

export interface InitialDataHR {
  vacancyList: IVacancy[];
  activeVacancyList: IVacancy[];
  candidatePhoneType: {
    value: number;
    label: string;
  }[];
  candidateStatus: {
    [key: string]: string;
  };
  candidateHistoryAction: {
    [key: string]: string;
  };
  candidateHistoryType: {
    [key: string]: string;
  };
  genderList: {
    [key: string]: string;
  };
  candidateStatusList: {
    label: string;
    value: number;
    count: string;
  }[];
  stageList: {
    label: string;
    value: number;
    color: string;
  }[];
  sourceList: {
    id: number;
    name: string;
    type: number;
    using_place: number;
    slug: string;
    iconFile: {
      base_url: string;
      full_url: string;
      id: number;
      path: string;
      resolution: string;
    };
  }[];
  userList: IUserResponsible[];
  meetingUserList: IUserResponsible[];
  bannedTypeList: {
    label: string;
    value: number;
  }[];
  rejectionTypeList: {
    label: string;
    value: number;
  }[];
  bonusForTypeList: {
    label: string;
    value: number;
  }[];
  staffList: {
    id: number;
    username: string;
    email: string;
    status: number;
    created_at: string;
    updated_at: string;
    userProfile: IUserProfile;
  }[];
  rejectedByList: IUserResponsible[];
  branchList: IBranch[];
  departmentListByVacancy: IDepartListVacancy[];
  userFirstMeeting: {
    candidate_id: string;
    datetime: string;
    stage: string;
    status: string;
  };
}

export interface IDepartListVacancy {
  id: number;
  name: string;
  vacancyList: IVacancy[];
}
export interface IUserResponsible {
  avatar: string;
  created_at: string;
  email: string;
  fullName: string;
  id: number;
  status: number;
  updated_at: string;
  username: string;
  userProfile: IUserProfile;
  role: string;
  base_user_id: number;
}
export interface IVacancy {
  role_id: number;
  id: number;
  color: string;
  title: string;
  slug: string;
  department_id: string;
  description: string;
  description_template: string;
  image_base_url: string;
  image_path: string;
  vacancy_url: string;
  order: number | string;
  status: number;
  is_bonus_for: boolean;
  image: {
    id: number;
    base_url: string;
    path: string;
    full_url: string;
  };
  sourceList: {
    id: number;
    name: string;
    type: number;
    using_place: number;
    slug: string;
    iconFile: {
      base_url: string;
      full_url: string;
      id: number;
      path: string;
      resolution: string;
    };
  }[];
  candidate_stages: {
    id: number;
    company_id: number;
    vacancy_id: number;
    stage: number;
  }[];
  stageList: {
    label: string;
    value: number;
  }[];
  training_stages: ICandidateTraningStage[];
  vacancyResponsible: {
    id: number;
    company_id: number;
    vacancy_id: number;
    role_id: number;
    stage: number;
    vacancy_candidate_stage_id: number;
  }[];
}

export type IAppicationStatus = {
  label: string;
  value: number;
  count: string;
};

export interface ICandidateTraningStage {
  id: number;
  order: number;
  name: string;
  is_checked: string;
  is_passed: string;
}
export interface ICandidateLabelPermissions {
  absent: boolean;
  call_request: boolean;
  ceo_confirmed: boolean;
  change_color: boolean;
  life_cycle: boolean;
  meeting: boolean;
  not_answered: boolean;
}
export interface ICandidateActionPermissions {
  create: boolean;
  delete: boolean;
  edit: boolean;
  move: boolean;
  rejected: boolean;
  sms: boolean;
  take: boolean;
}
export interface ICandidateAbsent {
  id: number;
  candidate_id: string;
  company_id: string;
  comment: string;
  created_by: number;
  createdBy: {
    avatar: string;
    created_at: string;
    email: string;
    fullName: string;
    id: number;
    status: number;
    updated_at: string;
    username: string;
  };
  datetime: string;
  options: {
    old_meeting: {
      responsible_id: 1;
      comment: null;
      datetime: "2023-09-28 10:21:00";
      responsible: "John Doe";
      deleted_at: "2023-10-10 12:22:56";
    };
  };
  responsible_id: string;
  type: string;
}
export interface ICandidate {
  age: number;
  bonus_for: any;
  bonus_for_type: number | null;
  bonus_for_id: number | null;
  candidateAvatar: {
    id: number;
    company_id: number;
    candidate_id: number;
    file_storage_item_id: number;
    type: number;
    url: string;
  };
  candidateLabels: ICandidateLabel[];
  candidateDocuments: ICandidateDocument[];
  candidatePhoneNumbers: ICandidatePhone[];
  trainingStages: ICandidateTraningStage[];
  color: string;
  comment: any;
  company_id: any;
  created_at: string;
  deleted_at: any;
  description: string;
  dob: string;
  first_name: string;
  gender: any;
  id: number;
  last_action_time: string;
  last_name: string;
  hired_date: string;
  own_phone_number: string;
  rejection_type: number;
  responsible_id: any;
  source_id: any;
  stage: number;
  status: number;
  system_user_id: any;
  vacancy: IVacancy;
  labelPermissions: ICandidateLabelPermissions;
  actionPermissions: ICandidateActionPermissions;
  ceo_approved: boolean;
  responsible: ICandidateResponsible;
  meeting: {
    date: string;
    id: number;
    responsible: ICandidateResponsible;
  };
  abs: ICandidateAbsent[];
}
export interface IHRMainGeneral {
  counts: {
    id: string;
    count: string;
  }[];
  stage: any;
  vacancy_id: number | string;
  vacancies: IVacancy[];
  data: IFetchList<ICandidate>;
}

export interface ICandidateResponsible {
  avatar: string;
  created_at: string;
  email: string;
  fullName: string;
  id: number;
  status: number;
  role: string;
  updated_at: string;
  username: string;
  userProfile: IUserProfile;
  base_user_id: number;
}
export interface ICandidateDocument {
  id: number;
  company_id: number;
  candidate_id: number;
  file_storage_item_id: number;
  type: number;
  url: string;
  name: string;
}
export interface ICandidatePhone extends IUserPhone {
  company_id: any;
  candidate_id: number;
}

export interface ICandidateLabel {
  id: number;
  company_id: number;
  candidate_id: number;
  datetime: string;
  responsible_id: number;
  options: null;
  created_by: number;
  createdBy: {
    id: number;
    username: string;
    email: string;
    status: number;
    created_at: string;
    updated_at: string;
    userProfile: IUserProfile;
    avatar: string;
    fullName: string;
  };
  responsible: {
    id: number;
    username: string;
    email: string;
    status: number;
    created_at: string;
    updated_at: string;
    userProfile: IUserProfile;
    avatar: string;
    fullName: string;
  };
  type: TStatuses;
  color: string;
}

export interface ICheckCandidatePhoneNumber {
  status: boolean;
  candidates: ICandidate[];
}

export interface ICandidateMeeting {
  id: number;
  company_id: number;
  source_id: number;
  vacancy_id: number;
  first_name: string;
  last_name: string;
  description: string;
  comment: string;
  dob: string;
  bonus_for: number;
  color: string;
  system_user_id: number;
  last_action_time: string;
  gender: number;
  stage: number;
  status: number;
  rejection_type: number;
  created_at: string;
  deleted_at: string;
  responsible_id: number;
}

export interface IMeetingDay {
  candidate: {
    fullName: string;
    currentStage: string;
    currentVacancy: string;
  };
  time: string;
}

export interface ICandidateStages {
  label: string;
  stages: {
    [key: number]: string;
  }[];
  value: CandidateStatus;
}
