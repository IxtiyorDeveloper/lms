import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const StudentsLocation = dynamic(
  () => import("app/statistics/students-location/home"),
);

const StudentsLocationPage = () => {
  return <StudentsLocation />;
};

export default withAuth(StudentsLocationPage, [
  PAGE_VISITS.can_visit_statistics_podo_list_page,
]);
