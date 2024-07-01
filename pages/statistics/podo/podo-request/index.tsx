import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const PodoReports = dynamic(
  () => import("app/statistics/podo/podo-request/home"),
);
const PodoListPage = () => {
  return <PodoReports />;
};
export default withAuth(PodoListPage, [
  PAGE_VISITS.can_visit_statistics_podo_list_page,
]);
