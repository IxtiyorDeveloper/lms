import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import { MockGroupExamResult } from "app";

const MockGroupExam = () => {
  return <MockGroupExamResult />;
};

export default withAuth(MockGroupExam, [
  PAGE_VISITS.can_visit_exam_results_page,
]);
