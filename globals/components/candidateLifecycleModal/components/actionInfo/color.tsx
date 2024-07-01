import { CandidateStatus } from "constants/hr";
import { bgColors } from "styles/theme";

const Color = ({ status }: { status: number | undefined }): string => {
  const color = {
    [CandidateStatus.APPLICANT]: bgColors.purpleCrystal,
    [CandidateStatus.CANDIDATE]: bgColors.midori,
    [CandidateStatus.REJECTED]: bgColors.pop,
    [CandidateStatus.BANNED]: bgColors.pop,
    [CandidateStatus.RESERVED]: bgColors.serengeti,
    [CandidateStatus.HIRED]: bgColors.purpleCrystal,
  }[Number(status ?? 0)];
;
  return color ?? bgColors.purpleCrystal;
};

export default Color;
