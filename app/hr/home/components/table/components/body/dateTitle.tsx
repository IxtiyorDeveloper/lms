import { CandidateStatus } from "constants/hr";

export const DateTitle = ({ status }: { status: CandidateStatus }) => {
  return {
    [CandidateStatus.APPLICANT]: "Created date",
    [CandidateStatus.CANDIDATE]: "",
    [CandidateStatus.BANNED]: "Rejected date",
    [CandidateStatus.REJECTED]: "Rejected date",
    [CandidateStatus.RESERVED]: "Reserved date",
    [CandidateStatus.HIRED]: "Hired date",
  }[status];
};
