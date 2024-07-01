import React from "react";
import {
  CandidateStageLabel,
  CandidateStatus,
  CandidateStatusLabel,
} from "constants/hr";
import { ColorWrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { ColorStage, ColorStatus } from "./utils/color";

export const StatusIdentify = ({
  stage,
  status,
}: {
  stage: number;
  status: number;
}) => {
  const isCandidate = status === CandidateStatus.CANDIDATE;
  const color = isCandidate ? ColorStage({ stage }) : ColorStatus({ status });
  return (
    <ColorWrapper
      bgColor={color}
      style={{
        color: color?.includes(bgColors.purpleCrystal)
          ? textColors.dark
          : textColors.white,
      }}>
      {isCandidate
        ? CandidateStageLabel[stage as keyof typeof CandidateStageLabel]
        : CandidateStatusLabel[status as keyof typeof CandidateStatusLabel]}
    </ColorWrapper>
  );
};
