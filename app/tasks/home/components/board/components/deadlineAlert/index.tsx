import React from "react";
import moment from "moment";
import { Flex } from "antd";
import { Wrapper } from "./style";
import { DeadlineTimeSvg } from "@jasurbekyuldashov/lms-web-icons";
import { DATE_FORMAT_DD_MMM__YYYY_HH_mm } from "constants/dates";
import { getTimeDifference } from "utils/toHourMinute";
import { bgColors } from "styles/theme";

const DeadlineAlert = ({ deadline }: { deadline?: string | null }) => {
  const isEnd = moment(deadline).isBefore(moment());
  const [leftTime, setLeftTime] = React.useState(getTimeDifference(deadline!));

  setTimeout(() => {
    setLeftTime(getTimeDifference(deadline!));
  }, 1000);

  if (!deadline) return null;
  return (
    <Wrapper isEnd={isEnd}>
      <Flex gap={10} align="center">
        <div className={`icon`}>
          <DeadlineTimeSvg color={isEnd ? bgColors.red : bgColors.white} />
        </div>
        <div>
          <p>Deadline</p>
          <h4>{moment(deadline).format(DATE_FORMAT_DD_MMM__YYYY_HH_mm)}</h4>
        </div>
      </Flex>
      <p className="left_time">{leftTime}</p>
    </Wrapper>
  );
};

export default DeadlineAlert;
