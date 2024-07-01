import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const SMSStatistics = dynamic(() => import("app/statistics/sms"));
const SMS = () => {
  return <SMSStatistics />;
};

export default withAuth(SMS, [PAGE_VISITS.can_see_sms_delivery]);
