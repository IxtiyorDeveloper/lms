import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import { CategoryArchivePage } from "app";

const CategoryArchive = () => {
  return <CategoryArchivePage />;
};

export default withAuth(CategoryArchive, [PAGE_VISITS.can_visit_tasks_page]);
