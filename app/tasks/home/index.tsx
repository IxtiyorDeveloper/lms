import React from "react";
import {
  Board,
  Filter,
  LeaveDissatisfactionModal,
  RateModal,
} from "./components";
import { PageWrapper } from "./style";

const TasksPage = () => {
  return (
    <PageWrapper>
      <Filter />
      <Board />
      <RateModal />
      <LeaveDissatisfactionModal />
    </PageWrapper>
  );
};

export default TasksPage;
