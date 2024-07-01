import { CandidateStages, CandidateStatus } from "constants/hr";
import { bgColors } from "styles/theme";

export const ColorStatus = ({
  status,
}: {
  status: number | undefined;
}): string => {
  const color = {
    [CandidateStatus.APPLICANT]: bgColors.purpleCrystal,
    [CandidateStatus.CANDIDATE]: bgColors.midori,
    [CandidateStatus.REJECTED]: bgColors.pop,
    [CandidateStatus.BANNED]: bgColors.pop,
    [CandidateStatus.RESERVED]: bgColors.serengeti,
    [CandidateStatus.HIRED]: bgColors.purpleCrystal,
  }[Number(status ?? 0)];
  return color ?? bgColors.purpleCrystal;
};

export const ColorStage = ({
  stage,
}: {
  stage: number | undefined;
}): string => {
  const color = {
    [CandidateStages.NEW]: bgColors.purpleCrystal,
    [CandidateStages.INTERVIEW_1]: bgColors.primary,
    [CandidateStages.INTERVIEW_2]: bgColors.primary,
    [CandidateStages.HEAD_DEPARTMENT]: bgColors.pastel,
    [CandidateStages.CEO]: bgColors.kitten,
    [CandidateStages.APPROVED]: bgColors.serengeti,
    [CandidateStages.TRAINING]: bgColors.deep,
    [CandidateStages.REGISTRATION]: bgColors.serengeti,
  }[Number(stage ?? 0)];
  return color ?? bgColors.purpleCrystal;
};
