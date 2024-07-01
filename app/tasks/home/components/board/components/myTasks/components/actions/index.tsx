import React, { FC } from "react";
import { Wrapper } from "./style";
import { ETaskStatus, IRoleObj, ITask } from "types";
import { Rate } from "antd";
import { generateButtons } from "./buttons";

interface IProps {
  roleDetails?: IRoleObj;
  reverse?: boolean;
  state?: number;
  taskData?: ITask;
  extraKeys?: string[];
  onCancel?: () => void;
  handleChangeStatus: (status: number) => void;
  handleOpenUpdateTaskModal: () => void;
}

const TaskActions: FC<IProps> = (props) => {
  const getActions = (arg?: IRoleObj) => {
    let keys: string[] = [];
    for (let key in arg) {
      if (arg[key as keyof typeof arg].allowed) {
        keys.push(key);
      }
    }
    return keys;
  };

  const keys = getActions(props.roleDetails);

  const buttons = generateButtons({ props });

  return (
    <Wrapper
      style={{
        justifyContent: props.reverse ? "flex-start" : "flex-end",
        flexDirection: props.reverse ? "row-reverse" : "row",
      }}
    >
      {Number(props.taskData?.status) === Number(ETaskStatus.CHECKED) ? (
        <Rate defaultValue={Number(props.taskData?.point)} disabled />
      ) : (
        [...props.extraKeys!, ...keys].map((key: string) => (
          <>{buttons[key as keyof typeof buttons]}</>
        ))
      )}
    </Wrapper>
  );
};

export default TaskActions;

TaskActions.defaultProps = {
  extraKeys: [],
};
