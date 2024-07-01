import React from "react";
// import { FinanceSettings } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const FinanceSettings = dynamic(() => import("app/settings/financeSettings"));
const FinanceSettingsPage = () => {
  return <FinanceSettings />;
};

export default withAuth(FinanceSettingsPage, [
  PAGE_VISITS.can_visit_settings_finance_settings_page,
]);
