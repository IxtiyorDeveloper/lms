import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import { TasksPage } from "app";

const Tasks = () => {
  return <TasksPage />;
};

export default withAuth(Tasks, [PAGE_VISITS.can_visit_tasks_page]);
