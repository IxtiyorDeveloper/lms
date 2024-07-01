import React from "react";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";
import { COMPONENTS_VIEWS } from "constants/permissions";

const ReferralPage = dynamic(() => import("app/leads/referral"));

const Referral = () => {
  return <ReferralPage />;
};

export default withAuth(Referral, [
  COMPONENTS_VIEWS.admin_can_see_student_referrals,
]);
