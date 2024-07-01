import { Flex } from "antd";
import React from "react";
import { MarkWrapper } from "./style";

const ExamPartMark = ({
  mark,
  totalMark,
  is_label = true,
}: {
  mark?: number;
  totalMark?: number;
  is_label?: boolean;
}) => {
  return (
    <MarkWrapper justify="space-between" align="center">
      {is_label && <div>Total</div>}
      <div className="mark">
        {mark ?? 0} of {totalMark ?? 0}
      </div>
    </MarkWrapper>
  );
};

export default ExamPartMark;
