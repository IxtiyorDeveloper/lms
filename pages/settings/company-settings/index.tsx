import React from "react";
// import { CompanySettings } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const CompanySettings = dynamic(() => import("app/settings/companySettings"));
const Settings = () => {
  return <CompanySettings />;
};

export default withAuth(Settings, [
  PAGE_VISITS.can_visit_settings_company_settings_page,
]);
