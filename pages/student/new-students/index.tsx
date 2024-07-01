import React from "react";
import { NewStudents } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const NewStudentsPage = () => {
  return (
    <div>
      <NewStudents />
    </div>
  );
};

export default withAuth(NewStudentsPage, [
  PAGE_VISITS.can_visit_students_new_students_page,
]);
