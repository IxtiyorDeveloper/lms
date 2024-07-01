import React from "react";
import withAuth from "utils/guard";
// import { SmsPage } from "app";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const SmsPage = dynamic(() => import("app/settings/smsSettings/home"));
const SMSPage = () => {
  return <SmsPage />;
};

export default withAuth(SMSPage, [
  PAGE_VISITS.can_visit_settings_sms_settings_page,
]);
