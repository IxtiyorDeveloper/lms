import React from "react";
// import { CreateStudent } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const CreateStudent = dynamic(() => import("app/student/create-student"));
const CreateStudentPage = () => {
  return <CreateStudent />;
};

export default withAuth(CreateStudentPage, [
  PAGE_VISITS.can_visit_students_new_students_page,
]);
