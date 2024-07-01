import React from "react";
// import { LeadStatistics } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const LeadStatistics = dynamic(
  () => import("app/statistics/dashboard/leadStatistics")
);
const LeadStatisticsPage = () => {
  return <LeadStatistics />;
};

export default withAuth(LeadStatisticsPage);
