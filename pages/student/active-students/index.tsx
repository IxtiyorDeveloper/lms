import React from "react";
// import { ActiveStudents } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const ActiveStudents = dynamic(() => import("app/student/active-students"));
const ActiveStudentsPage = () => {
  return (
    <div>
      <ActiveStudents />
    </div>
  );
};

export default withAuth(ActiveStudentsPage, [
  PAGE_VISITS.can_visit_students_active_students_page,
]);
