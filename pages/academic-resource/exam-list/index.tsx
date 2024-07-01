import React from "react";
import { ExamList } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const ExamListPage = () => {
  return <ExamList />;
};

export default withAuth(ExamListPage, [
  PAGE_VISITS.can_visit_exam_results_page,
]);
