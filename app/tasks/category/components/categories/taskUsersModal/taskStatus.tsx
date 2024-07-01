import React, { FC } from "react";
import {
  CheckSvg,
  DoubleCheckSvg,
  XIconSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { StatusWrapper } from "./style";
import { toCapitalize } from "utils/toCapitalize";
import { bgColors } from "styles/theme";
import { useTaskEnums } from "hooks";

interface IProps {
  statusNumber?: number;
  statistic?: number;
}

const TaskStatus: FC<IProps> = (props) => {
  const { statusNumber, statistic } = props;

  const { data: taskEnums } = useTaskEnums();

  const icons = {
    OPENED: <CheckSvg color={bgColors.white} />,
    DONE: <CheckSvg color={bgColors.white} />,
    REJECTED: <XIconSvg color={bgColors.white} />,
    CHECKED: <DoubleCheckSvg color={bgColors.white} />,
  };

  const status = taskEnums?.TaskStatusEnum[statusNumber || 100];
  const color = taskEnums?.TaskStatusColorEnum[statusNumber || 100]?.ACTIVE_BOX;

  return (
    <StatusWrapper style={{ background: color }}>
      {icons[status as keyof typeof icons]} {toCapitalize(status)} ({statistic})
    </StatusWrapper>
  );
};

export default TaskStatus;
