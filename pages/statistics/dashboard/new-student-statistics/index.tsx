import React from "react";
// import { NewStudentStatistics } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const NewStudentStatistics = dynamic(
  () => import("app/statistics/dashboard/newStudentStatistics")
);
const NewStudentStatisticsPage = () => {
  return <NewStudentStatistics />;
};

export default withAuth(NewStudentStatisticsPage);
