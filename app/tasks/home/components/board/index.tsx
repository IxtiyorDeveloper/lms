import React from "react";
import { BoardWrapper } from "./style";
import { BoardSvg, ComplexThinTab, StarSvg } from "components";
import {
  RightComponent,
  MyTasks,
  CreateTaskModal,
  TaskViewModal,
} from "./components";
import { useTaskEnums } from "hooks";
import { TaskUserType } from "types";
import { useRouter } from "next/router";

const Board = () => {
  const router = useRouter();
  const { data: dataEnums } = useTaskEnums();

  const userType = router.query.userType?.toString() || TaskUserType.MyTask;

  const menu = [
    {
      label: (
        <div className="flex">
          <BoardSvg /> My tasks
        </div>
      ),
      isClickable: true,
      query: {
        page: 1,
        pageSize: 20,
        userType: TaskUserType.MyTask,
      },
      value: TaskUserType.MyTask,
    },
    {
      label: (
        <div className="flex">
          <StarSvg /> Assigned tasks
        </div>
      ),
      isClickable: true,
      query: {
        page: 1,
        pageSize: 20,
        userType: TaskUserType.AssignedTasks,
      },
      value: TaskUserType.AssignedTasks,
    },
  ];

  const initValue = menu?.findIndex(
    (i) =>
      i.value == (router.query?.userType?.toString() || TaskUserType.MyTask)
  );

  return (
    <BoardWrapper>
      <ComplexThinTab
        centered
        heightTab="40px"
        menu={menu}
        topLeftChildren={<RightComponent />}
        initValue={initValue}
      />
      <CreateTaskModal />
      <TaskViewModal />
      <MyTasks dataEnums={dataEnums} userType={userType as TaskUserType} />
    </BoardWrapper>
  );
};

export default Board;
