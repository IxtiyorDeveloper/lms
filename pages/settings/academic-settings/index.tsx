import React from "react";
// import { AcademicSettings } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const AcademicSettings = dynamic(() => import("app/settings/academicSettings"));
const Settings = () => {
  return <AcademicSettings />;
};

export default withAuth(Settings, [
  PAGE_VISITS.can_visit_settings_academic_settings_page,
]);
