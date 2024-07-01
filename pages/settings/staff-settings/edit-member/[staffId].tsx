import React from "react";
// import { CreateReception } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const CreateReception = dynamic(
  () => import("app/settings/staffSettings/edit-member")
);
const CreateRec = () => {
  return <CreateReception />;
};

export default withAuth(CreateRec, [
  PAGE_VISITS.can_visit_settings_staff_settings_page,
]);
