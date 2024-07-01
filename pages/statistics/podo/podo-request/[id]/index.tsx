import React from "react";
// import { PodoList } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const SingleReport = dynamic(
  () => import("app/statistics/podo/podo-request/[id]/home"),
);
const PodoListPage = () => {
  return <SingleReport />;
};
export default withAuth(PodoListPage, [
  PAGE_VISITS.can_visit_statistics_podo_list_page,
]);
