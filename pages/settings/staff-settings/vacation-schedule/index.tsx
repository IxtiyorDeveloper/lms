import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const VacationSchedulePage = dynamic(
  () => import("app/settings/staffSettings/vacationSchedule"),
);

const VacationSchedule = () => {
  return <VacationSchedulePage />;
};

export default withAuth(VacationSchedule, [
  PAGE_VISITS.can_visit_settings_staff_settings_page,
]);
