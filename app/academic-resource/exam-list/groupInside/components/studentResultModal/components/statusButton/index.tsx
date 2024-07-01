import React from "react";
import { Wrapper } from "./style";
import { EXAM_PROCESS } from "constants/exam";
import { toggleModal } from "store/slices";
import { bgColors } from "styles/theme";
import { useDispatch } from "react-redux";

const StatusButton = ({ status }: { status?: number }) => {
  const dispatch = useDispatch();
  const is_passed = status === EXAM_PROCESS.SUCCESS;
  const is_failed = status === EXAM_PROCESS.FAIL;
  const is_conditional = status === EXAM_PROCESS.CONDITIONAL;

  const bgColor = is_passed
    ? bgColors.midori
    : is_failed
      ? bgColors.pop
      : bgColors.primary;

  const label = {
    [EXAM_PROCESS.SUCCESS]: "PASS",
    [EXAM_PROCESS.FAIL]: "FAIL",
    [EXAM_PROCESS.CONDITIONAL]: "COND",
  };

  const handleClick = () => {
    if (!is_passed && is_conditional) {
      // dispatch(
      //   toggleModal({
      //     key: "studentExamChangeStatus",
      //     data: {
      //       data: {
      //         group,
      //       },
      //       open: true,
      //     },
      //   })
      // );
      dispatch(
        toggleModal({
          key: "studentExamResult",
          data: {
            data: {},
            open: false,
          },
        }),
      );
    }
  };

  if (status === EXAM_PROCESS.NOT_SET) return null;
  return (
    <Wrapper bgColor={bgColor} onClick={handleClick} type="primary">
      {label[status as keyof typeof label]}
    </Wrapper>
  );
};

export default StatusButton;
