import React from "react";

import { WaitingList } from "app";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";

const WaitingListPage = () => {
  return <WaitingList />;
};

export default withAuth(WaitingListPage, [
  PAGE_VISITS.can_visit_students_waiting_list_page,
]);
