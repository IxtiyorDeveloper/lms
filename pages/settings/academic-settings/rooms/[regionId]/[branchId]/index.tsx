import React from "react";
// import { Rooms } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";
const Rooms = dynamic(
  () => import("app/settings/academicSettings/rooms/[regionId]/[branchId]")
);
const RoomsPage = () => {
  return <Rooms />;
};

export default withAuth(RoomsPage, [
  PAGE_VISITS.can_visit_settings_academic_settings_page,
]);
