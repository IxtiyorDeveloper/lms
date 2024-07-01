import React from "react";
import CashFlow from "app/finance/cashflow-test";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const CashFlowPage = () => {
  return <CashFlow />;
};

export default withAuth(CashFlowPage, [
  PAGE_VISITS.can_visit_finance_cash_flow_page,
]);
