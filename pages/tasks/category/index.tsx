import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import { CategoryPage } from "app";

const Category = () => {
  return <CategoryPage />;
};

export default withAuth(Category, [PAGE_VISITS.can_visit_tasks_page]);
