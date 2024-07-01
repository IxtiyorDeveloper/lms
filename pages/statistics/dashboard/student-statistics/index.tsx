import React from "react";
// import { StudentStatistics } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const StudentStatistics = dynamic(
  () => import("app/statistics/dashboard/studentStatistics")
);
const StudentStatisticsPage = () => {
  return <StudentStatistics />;
};

export default withAuth(StudentStatisticsPage);
