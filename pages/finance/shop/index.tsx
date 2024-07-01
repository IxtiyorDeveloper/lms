import React from "react";
import { Shop } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const TransactionsPage = () => {
  return <Shop />;
};

export default withAuth(TransactionsPage, [
  PAGE_VISITS.can_visit_finance_transactions_page,
]);
