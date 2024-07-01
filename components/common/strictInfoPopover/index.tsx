import React from "react";
import { Popover } from "antd";
import { bgColors } from "../../../styles/theme";
import { CircleQuestionMarkSvg } from "../../index";
import { Wrapper } from "./style";

const StrictInfoPopover = () => {
  return (
    <Popover
      content={
        <Wrapper>
          <p>What is this?</p>
          <p className="info">
            If strict is on it means this preferences is very important for this
            student, student cannot accept any other option for this preferences
            and system will not recommend groups in "partially match tab" if
            there is no group matching for this preferences.
          </p>
        </Wrapper>
      }
      placement="bottom"
      style={{ padding: 0 }}
      showArrow={false}
    >
      <CircleQuestionMarkSvg width={16} height={16} color={bgColors.sadet} />
    </Popover>
  );
};

export default StrictInfoPopover;
