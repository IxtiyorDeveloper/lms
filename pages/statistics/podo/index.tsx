import React from "react";
// import { PodoList } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const PodoList = dynamic(() => import("app/statistics/podo/home"));
const PodoListPage = () => {
  return <PodoList />;
};
export default withAuth(PodoListPage, [
  PAGE_VISITS.can_visit_statistics_podo_list_page,
]);
