import React from "react";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";
import { PAGE_VISITS } from "../../../constants/permissions";

const CreatedStudents = dynamic(
  () => import("app/statistics/created-students/home")
);
const CreateStudentsPage = () => {
  return <CreatedStudents />;
};

export default withAuth(CreateStudentsPage, [
  PAGE_VISITS.can_visit_created_student_page,
]);
