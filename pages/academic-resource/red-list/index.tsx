import React from "react";
// import { RedList } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const RedList = dynamic(() => import("app/academic-resource/red-list"));

const RedListPage = () => {
  return <RedList />;
};

export default withAuth(RedListPage, [PAGE_VISITS.can_see_red_list]);
