import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import { RewardsPage } from "app";

const StaffRewardsPage = () => {
  return <RewardsPage />;
};

export default withAuth(StaffRewardsPage, [
  PAGE_VISITS.can_visit_settings_staff_settings_page,
]);
