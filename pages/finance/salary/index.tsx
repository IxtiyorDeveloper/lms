import React from "react";
import { Salary } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const SalaryPage = () => {
  return <Salary />;
};

export default withAuth(SalaryPage, [
  PAGE_VISITS.can_visit_finance_salary_page,
]);
