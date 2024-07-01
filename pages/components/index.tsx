import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const Components = dynamic(() => import("app/components"));

const ComponentsPage = () => {
  return <Components />;
};

export default withAuth(ComponentsPage, [PAGE_VISITS.can_visit_groups_page]);
