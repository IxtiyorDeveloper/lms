import React from "react";
import { PaymentStatistics } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const PaymentStatisticsPage = () => {
  return (
    <div>
      <PaymentStatistics />
    </div>
  );
};

export default withAuth(PaymentStatisticsPage, [
  PAGE_VISITS.can_visit_finance_payment_statistics_page,
]);
