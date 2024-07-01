import React from "react";
import { AbsentStudents } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const AbsentStudentPage = () => {
  return <AbsentStudents />;
};

export default withAuth(AbsentStudentPage, [
  PAGE_VISITS.can_visit_academic_resource_absent_students_page,
]);
