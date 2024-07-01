import React from "react";
import { Transactions } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const TransactionsPage = () => {
  return <Transactions />;
};

export default withAuth(TransactionsPage, [
  PAGE_VISITS.can_visit_finance_transactions_page,
]);
