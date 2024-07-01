import withAuth from "utils/guard";
// import { Groups } from "app";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const Groups = dynamic(() => import("app/groups/home"));
const GroupsPage = () => {
  return <Groups />;
};

export default withAuth(GroupsPage, [PAGE_VISITS.can_visit_groups_page]);
