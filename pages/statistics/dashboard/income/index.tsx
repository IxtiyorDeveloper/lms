import React from "react";
// import { Income } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const Income = dynamic(() => import("app/statistics/dashboard/income"));

const IncomePage = () => {
  return <Income />;
};

export default withAuth(IncomePage);
