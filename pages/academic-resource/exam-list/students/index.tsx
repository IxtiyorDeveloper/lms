import React from "react";
import { FailedStudent } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const StudentsPage = () => {
  return <FailedStudent />;
};

export default withAuth(StudentsPage, [
  PAGE_VISITS.can_visit_exam_results_page,
]);
