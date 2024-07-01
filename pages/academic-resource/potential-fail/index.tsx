import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const PotentialFail = dynamic(
  () => import("app/academic-resource/potential-fail"),
);

const PotentialFailPage = () => {
  return <PotentialFail />;
};

export default withAuth(PotentialFailPage, [
  PAGE_VISITS.can_visit_academic_fallible_list_page,
]);
