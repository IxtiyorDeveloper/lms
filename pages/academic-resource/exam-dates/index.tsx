import React from "react";
import { ExamDates } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const ExamDatePage = () => {
  return <ExamDates />;
};

export default withAuth(ExamDatePage, [PAGE_VISITS.can_visit_exam_dates_page]);
