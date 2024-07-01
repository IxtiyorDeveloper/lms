import React from "react";
// import { DebtorsPage } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const DebtorsPage = dynamic(() => import("app/settings/debtors"));
const Debtors = () => {
  return <DebtorsPage />;
};

export default withAuth(Debtors, [PAGE_VISITS.can_visit_finance_debtors_page]);
