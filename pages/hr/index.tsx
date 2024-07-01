import React from "react";
import { HRPage } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const HR = () => {
  return <HRPage />;
};

export default withAuth(HR, [PAGE_VISITS.can_visit_hr_page]);
