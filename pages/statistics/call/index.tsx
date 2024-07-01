import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const CallStatistics = dynamic(() => import("app/statistics/call"));
const SMS = () => {
  return <CallStatistics />;
};

export default withAuth(SMS, [PAGE_VISITS.can_see_sms_delivery]);
