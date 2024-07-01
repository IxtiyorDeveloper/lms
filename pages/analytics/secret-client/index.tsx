import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const Page = dynamic(() => import("app/analytics/secret-client"));

const SecretClientPage = () => {
  return <Page />;
};

export default withAuth(SecretClientPage, [PAGE_VISITS.can_see_red_list]);
