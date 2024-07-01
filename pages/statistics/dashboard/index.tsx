import React from "react";
// import { Statistics } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const Statistics = dynamic(() => import("app/statistics/dashboard"));

const StatisticsPage = () => {
  return <Statistics />;
};

export default withAuth(StatisticsPage, [
  PAGE_VISITS.can_visit_statistics_dashboard_page,
]);
