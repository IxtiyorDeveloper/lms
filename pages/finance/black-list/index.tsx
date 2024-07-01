import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import { BlackList } from "app";

const BlackListPage = () => {
  return <BlackList />;
};

export default withAuth(BlackListPage, [
  PAGE_VISITS.can_visit_black_list_students_page,
]);
