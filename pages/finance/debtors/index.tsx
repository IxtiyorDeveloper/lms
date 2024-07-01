import React from "react";
import { Debtors } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const DebtorsRoute = () => {
  return (
    <div>
      <Debtors />
    </div>
  );
};

export default withAuth(DebtorsRoute, [
  PAGE_VISITS.can_visit_finance_debtors_page,
]);
