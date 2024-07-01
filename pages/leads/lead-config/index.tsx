import React from "react";
// import { LeadConfigPage as LeadConfig } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const LeadConfig = dynamic(() => import("app/leads/leadConfig/home"));
const LeadConfigPage = () => {
  return <LeadConfig />;
};

export default withAuth(LeadConfigPage, []);
