import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import { CreateCandidate } from "app";

const CreateCandidatePage = () => {
  return <CreateCandidate />;
};

export default withAuth(CreateCandidatePage, [
  PAGE_VISITS.can_visit_settings_staff_settings_page,
]);
