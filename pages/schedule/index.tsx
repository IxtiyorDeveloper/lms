import React from "react";
// import { SchedulePage } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const SchedulePage = dynamic(() => import("app/schedule/home"));
const Schedule = () => {
  return <SchedulePage />;
};

export default withAuth(Schedule, [PAGE_VISITS.can_visit_schedule_page]);
