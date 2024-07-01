import React, { FC } from "react";
import {
  CardBody,
  CardHeader,
  CardFooter,
  DescriptionView,
  TaskCardWrapper,
  StatusWrapper,
  IconProcessing,
} from "./style";
import moment from "moment";
import ImageView from "../imageView";
import Credentials from "../credentials";
import CreatedByView from "../createdByView";
import TaskActions from "../actions";
import { IProps } from "./type";
import { ETaskState, ITask } from "types";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { useChangeStatus } from "hooks";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";
import { Enum } from "globals/components/sourceModal";
import { ProcessSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { TaskModalEnums } from "types/tasks/modalEnums";
import { TaskId } from "components";

const TaskCard: FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const isProcessing = props.task.state === ETaskState.ON_PROCESS;

  const changeStatus = useChangeStatus({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.task_index]).then();
      queryClient.invalidateQueries({ queryKey: ["opened_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["done_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["checked_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["rejected_tasks"] });
      toast.success("Status changed!");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleChangeStatus = (status: number) => {
    const readyData = {
      task_id: props.task.id,
      state: status,
      point: null,
    };

    if (
      status === ETaskState.ON_CREATED ||
      status === ETaskState.ON_STOP_PROCESS
    ) {
      dispatch(
        toggleModal({
          key: "leaveDissatisfaction",
          data: {
            data: { ...readyData, modalType: TaskModalEnums.Dissatisfaction },
            open: true,
          },
        })
      );
    }

    if (status === ETaskState.ON_DONE) {
      dispatch(
        toggleModal({
          key: "leaveDissatisfaction",
          data: {
            data: { ...readyData, modalType: TaskModalEnums.DONE },
            open: true,
          },
        })
      );
    }

    if (status === ETaskState.ON_CHECKED) {
      dispatch(
        toggleModal({
          key: "rateTaskModal",
          data: {
            data: readyData,
            open: true,
          },
        })
      );
    }

    if (status === ETaskState.ON_IMPOSSIBLE) {
      dispatch(
        toggleModal({
          key: "leaveDissatisfaction",
          data: {
            data: { ...readyData, modalType: TaskModalEnums.Reject },
            open: true,
          },
        })
      );
    }

    if (
      status !== ETaskState.ON_CREATED &&
      status !== ETaskState.ON_IMPOSSIBLE &&
      status !== ETaskState.ON_CHECKED &&
      status !== ETaskState.ON_ASSIGN &&
      status !== ETaskState.ON_DONE
    )
      changeStatus.mutate({ body: readyData });
  };

  const handleOpenViewModal = (task: ITask) => {
    dispatch(
      toggleModal({
        key: "taskView",
        data: {
          data: task,
          open: true,
        },
      })
    );
  };

  const handleOpenUpdateTaskModal = () => {
    dispatch(
      toggleModal({
        key: "createTask",
        data: {
          data: {
            type: Enum.update,
            id: props.task.id,
          },
          open: true,
        },
      })
    );
  };

  return (
    <TaskCardWrapper onClick={() => handleOpenViewModal(props.task)}>
      <CardHeader>
        <StatusWrapper>
          <TaskId
            id={props.task.id}
            color={props.color}
            state={props.task.state}
          />
          {isProcessing && (
            <IconProcessing>
              <ProcessSvg
                className="animation"
                color={bgColors.dark}
                width={16}
                height={16}
              />
            </IconProcessing>
          )}
        </StatusWrapper>
        <span>{moment(props.task.updated_at).format("DD MMM, HH:mm")}</span>
      </CardHeader>
      <CardBody>
        <div className="first-flex">
          <ImageView srcSet={props.task.taskFiles} />
          <Credentials
            date={props.task.created_at}
            branch={props.task.branch}
            department={props.task.categoryName}
          />
        </div>
        <DescriptionView>{props.task.description}</DescriptionView>
        <CreatedByView
          createdBy={props.task.creator}
          profilePic={props.task.creator_avatar}
        />
      </CardBody>
      <CardFooter>
        <TaskActions
          taskData={props.task}
          handleChangeStatus={handleChangeStatus}
          handleOpenUpdateTaskModal={handleOpenUpdateTaskModal}
          extraKeys={
            props.task.state === 100 && props.userType !== 200 ? ["edit"] : []
          }
          state={Number(props.task.state)}
          roleDetails={props.task.roles}
        />
      </CardFooter>
    </TaskCardWrapper>
  );
};

export default TaskCard;
