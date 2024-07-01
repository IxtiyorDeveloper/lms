import React from "react";
// import { WaitingListStatistics } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const WaitingListStatistics = dynamic(
  () => import("app/statistics/dashboard/waitingListStatistics")
);

const StudentStatisticsPage = () => {
  return <WaitingListStatistics />;
};

export default withAuth(StudentStatisticsPage);
