import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const PotentialFailRequest = dynamic(
  () =>
    import("app/academic-resource/potential-fail/potential-fail-request/home"),
);
const PodoListPage = () => {
  return <PotentialFailRequest />;
};
export default withAuth(PodoListPage, [
  PAGE_VISITS.can_visit_academic_fallible_list_page,
]);
