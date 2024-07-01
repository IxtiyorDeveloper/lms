import React from "react";
// import { LeadsPage } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const LeadsPage = dynamic(() => import("app/leads/home"));
const Leads = () => {
  return <LeadsPage />;
};

export default withAuth(Leads, [PAGE_VISITS.can_visit_leads_page]);
