import React from "react";
// import { CreateRole } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const CreateRole = dynamic(() => import("app/settings/staffSettings/addRole"));
const AddRole = () => {
  return <CreateRole />;
};

export default withAuth(AddRole, [PAGE_VISITS.can_visit_create_role_page]);
