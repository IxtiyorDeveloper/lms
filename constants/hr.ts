export enum CandidateStatus {
  APPLICANT = 100,
  CANDIDATE = 200,
  RESERVED = 300,
  REJECTED = 400,
  BANNED = 500,
  HIRED = 600,
  ARCHIVED = 700,
}

export enum RejectionType {
  ONLINE = 100,
  OFFLINE = 200,
}

export const CandidateStatusLabel = {
  [CandidateStatus.APPLICANT]: "Applicants",
  [CandidateStatus.CANDIDATE]: "Candidates",
  [CandidateStatus.RESERVED]: "Reserved",
  [CandidateStatus.REJECTED]: "Rejected",
  [CandidateStatus.BANNED]: "Rejected",
  [CandidateStatus.HIRED]: "Hired",
  [CandidateStatus.ARCHIVED]: "Archived",
};

export enum CandidateStages {
  NEW = 100,
  INTERVIEW_1 = 200,
  INTERVIEW_2 = 300,
  HEAD_DEPARTMENT = 400,
  CEO = 500,
  APPROVED = 600,
  TRAINING = 700,
  REGISTRATION = 800,
}
export enum CandidateAction {
  CREATE = 100,
  MOVE = 200,
  ABS = 300,
  EDIT = 400,
  CALL = 500,
  SET_MEETING = 600,
  CLEAR_MEETING = 650,
  CALL_REQUEST = 700,
  NOT_ANSWERED = 800,
  EDIT_COMMENT = 900,
  SEND_SMS = 1000,
  COLOR_CHANGED = 1100,
  MERGE = 1200,
}

export enum CandidateHistoryType {
  MAIN = 100,
  EXTRA = 200,
}

export const CandidateStageLabel = {
  [CandidateStages.NEW]: "New",
  [CandidateStages.INTERVIEW_1]: "Interview 1",
  [CandidateStages.INTERVIEW_2]: "Interview 2",
  [CandidateStages.HEAD_DEPARTMENT]: "Head Department",
  [CandidateStages.CEO]: "CEO",
  [CandidateStages.APPROVED]: "Approved",
  [CandidateStages.TRAINING]: "Training",
  [CandidateStages.REGISTRATION]: "Registration",
};

export enum EApplicantStatus {
  ACTIVE = 100,
  NOT_ACTIVE = 200,
}
