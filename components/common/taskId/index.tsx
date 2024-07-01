import React, { FC } from "react";
import { IdWrapper, Wrapper } from "./style";
import { TaskTagSvg } from "@jasurbekyuldashov/lms-web-icons";
import { IProps } from "./type";
import { textColors } from "styles/theme";
import { ETaskState } from "types";

const TaskId: FC<IProps> = (props) => {
  const isPrimary = props.state === ETaskState.ON_PROCESS;
  const color = isPrimary ? textColors.dark : textColors.white;

  return (
    <Wrapper color={props.color}>
      <TaskTagSvg color={color} />
      <IdWrapper color={color}>{props.id}</IdWrapper>
    </Wrapper>
  );
};

export default TaskId;
