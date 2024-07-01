import React from "react";
// import { LostArchiveStudents } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";
const LostArchiveStudents = dynamic(
  () => import("app/statistics/dashboard/freshmanLost/lost")
);

const LostPage = () => {
  return <LostArchiveStudents />;
};

export default withAuth(LostPage, [
  PAGE_VISITS.can_visit_statistics_losts_page,
]);
