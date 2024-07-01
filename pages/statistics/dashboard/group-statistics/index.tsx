import React from "react";
// import { GroupStatistics } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const GroupStatistics = dynamic(
  () => import("app/statistics/dashboard/groupStatistics"),
);
const GroupStatisticsPage = () => {
  return <GroupStatistics />;
};

export default withAuth(GroupStatisticsPage);
