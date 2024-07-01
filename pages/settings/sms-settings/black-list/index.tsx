import React from "react";
// import { SmsBlackList } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const SmsBlackList = dynamic(
  () => import("app/settings/smsSettings/blackList")
);
const BlackListPage = () => {
  return <SmsBlackList />;
};
export default withAuth(BlackListPage, [
  PAGE_VISITS.can_visit_sms_black_list_page,
]);
