import React from "react";
// import { ArchivedStudents } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const ArchivedStudents = dynamic(() => import("app/student/archived"));
const NewStudentsPage = () => {
  return (
    <div>
      <ArchivedStudents />
    </div>
  );
};

export default withAuth(NewStudentsPage, [
  PAGE_VISITS.can_visit_students_archived_page,
]);
