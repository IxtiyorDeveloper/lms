import React from "react";
// import { CreateCourse } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const CreateCourse = dynamic(
  () => import("app/settings/academicSettings/createCourse")
);
const Settings = () => {
  return <CreateCourse />;
};

export default withAuth(Settings, [
  PAGE_VISITS.can_visit_settings_academic_settings_page,
]);
