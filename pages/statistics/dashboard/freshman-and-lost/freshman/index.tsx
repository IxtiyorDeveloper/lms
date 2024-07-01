import React from "react";
// import { FreshmanList } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const FreshmanList = dynamic(
  () => import("app/statistics/dashboard/freshmanLost/freshman")
);
const LostPage = () => {
  return <FreshmanList />;
};

export default withAuth(LostPage, [
  PAGE_VISITS.can_visit_statistics_freshman_page,
]);
