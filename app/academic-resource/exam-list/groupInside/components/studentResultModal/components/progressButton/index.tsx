import React from "react";
import { Wrapper } from "./style";
import { EXAM_PROCESS } from "constants/exam";
import { bgColors } from "styles/theme";

const ProgressButton = ({
  progress,
  status,
}: {
  progress: number;
  status?: number;
}) => {
  const is_passed = status === EXAM_PROCESS.SUCCESS;
  const is_failed = status === EXAM_PROCESS.FAIL;
  const is_conditional = status === EXAM_PROCESS.CONDITIONAL;

  const bgColor = is_passed
    ? bgColors.midori
    : is_failed
      ? bgColors.pop
      : bgColors.primary;

  const color = is_conditional ? bgColors.inDark : bgColors.white;

  if (status === EXAM_PROCESS.NOT_SET) return null;
  return (
    <Wrapper bgColor={bgColor} color={color} type="primary">
      {progress}%
    </Wrapper>
  );
};

export default ProgressButton;
