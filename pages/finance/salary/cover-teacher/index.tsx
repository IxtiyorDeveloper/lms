import React from "react";
import { CoverTeacher } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const CoverTeacherPage = () => {
  return <CoverTeacher />;
};

export default withAuth(CoverTeacherPage, [
  PAGE_VISITS.can_visit_finance_salary_page,
]);
