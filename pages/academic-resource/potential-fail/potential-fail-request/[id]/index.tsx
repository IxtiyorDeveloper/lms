import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const SingleReport = dynamic(
  () =>
    import(
      "app/academic-resource/potential-fail/potential-fail-request/[id]/home"
    ),
);
const PodoListPage = () => {
  return <SingleReport />;
};
export default withAuth(PodoListPage, [
  PAGE_VISITS.can_visit_academic_fallible_list_page,
]);
