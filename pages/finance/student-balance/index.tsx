import React from "react";
import withAuth from "utils/guard";
import { StudentBalance } from "app";
import { PAGE_VISITS } from "constants/permissions";

const StudentBalancePage = () => {
  return <StudentBalance />;
};

export default withAuth(StudentBalancePage, [
  PAGE_VISITS.can_visit_finance_student_balance_page,
]);
