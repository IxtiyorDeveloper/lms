import React from "react";
// import { FreshmanLost } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const FreshmanLost = dynamic(
  () => import("app/statistics/dashboard/freshmanLost")
);

const FreshmanLostPage = () => {
  return <FreshmanLost />;
};

export default withAuth(FreshmanLostPage, [
  PAGE_VISITS.can_visit_statistics_freshman_page,
]);
