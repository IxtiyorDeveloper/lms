import React from "react";
// import { LifeCycle } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const LifeCycle = dynamic(() => import("app/statistics/dashboard/lifeCycle"));

const LifeCyclePage = () => {
  return <LifeCycle />;
};

export default withAuth(LifeCyclePage);
