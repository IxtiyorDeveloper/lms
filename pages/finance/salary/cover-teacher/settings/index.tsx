import React from "react";
import { CoverTeacherSettings } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const CoverTeacherPage = () => {
  return <CoverTeacherSettings />;
};
export default withAuth(CoverTeacherPage, [
  PAGE_VISITS.can_visit_finance_salary_page,
]);
