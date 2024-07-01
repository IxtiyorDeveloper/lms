import React from "react";
import { AntdModal } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import {
  CardFooter,
  CardHeader,
  CardBody,
  CardWrapper,
  Title,
  Hr,
} from "./style";
import Details from "./components/taskDetails";
import History from "./components/taskHistory";
import { useChangeStatus, useSingleTaskView, useTaskEnums } from "hooks";
import TaskActions from "../myTasks/components/actions";
import { Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { ETaskState } from "types";
import { TaskModalEnums } from "types/tasks/modalEnums";
import { Enum } from "globals/components/sourceModal";

const TaskViewModal = () => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const handleCancel = () => {
    dispatch(
      toggleModal({
        key: "taskView",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const changeStatus = useChangeStatus({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opened_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["done_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["checked_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["rejected_tasks"] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.task_view] });
      toast.success("Status changed!");
      handleCancel();
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const { data: taskEnums, isLoading } = useTaskEnums();

  const {
    taskView: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const { data: singleTaskData, isLoading: singleLoading } = useSingleTaskView({
    id: data?.id,
  });

  const handleOpenUpdateTaskModal = () => {
    handleCancel();
    dispatch(
      toggleModal({
        key: "createTask",
        data: {
          data: {
            type: Enum.update,
            id: data?.id,
          },
          open: true,
        },
      })
    );
  };

  const handleChangeStatus = (status: number) => {
    const readyData = {
      task_id: data?.id,
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
            data: {
              ...readyData,
              modalType: TaskModalEnums.Dissatisfaction,
              fromView: true,
            },
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
            data: {
              ...readyData,
              modalType: TaskModalEnums.DONE,
              fromView: true,
            },
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
            data: { ...readyData, fromView: true },
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
            data: {
              ...readyData,
              modalType: TaskModalEnums.Reject,
              fromView: true,
            },
            open: true,
          },
        })
      );
    }

    if (
      status !== ETaskState.ON_CREATED &&
      status !== ETaskState.ON_IMPOSSIBLE &&
      status !== ETaskState.ON_ASSIGN &&
      status !== ETaskState.ON_CHECKED &&
      status !== ETaskState.ON_DONE
    ) {
      changeStatus.mutate({ body: readyData });
    }
  };

  return (
    <AntdModal open={open} onCancel={handleCancel} width={1020} destroyOnClose>
      <Spin spinning={isLoading || singleLoading}>
        <CardWrapper>
          <CardHeader>
            <Title>Task Number {data?.id}</Title>
          </CardHeader>

          <CardBody>
            <Details taskEnums={taskEnums} singleTask={singleTaskData} />
            <Hr />
            <History taskEnums={taskEnums} singleTask={singleTaskData} />
          </CardBody>
          <CardFooter>
            <TaskActions
              handleChangeStatus={handleChangeStatus}
              handleOpenUpdateTaskModal={handleOpenUpdateTaskModal}
              reverse
              state={singleTaskData?.state}
              roleDetails={singleTaskData?.roles}
              extraKeys={["cancel"]}
              onCancel={handleCancel}
            />
          </CardFooter>
        </CardWrapper>
      </Spin>
    </AntdModal>
  );
};

export default TaskViewModal;
