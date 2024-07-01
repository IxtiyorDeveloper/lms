import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import { StaffSettings } from "app";

const StaffSettingsPage = () => {
  return <StaffSettings />;
};

export default withAuth(StaffSettingsPage, [
  PAGE_VISITS.can_visit_settings_staff_settings_page,
]);
