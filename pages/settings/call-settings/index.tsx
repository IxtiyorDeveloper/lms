import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const CallSettings = dynamic(() => import("app/settings/callSettings"));
const CallSettingsPage = () => {
  return <CallSettings />;
};

export default withAuth(CallSettingsPage, [
  PAGE_VISITS.can_visit_call_settings,
]);
