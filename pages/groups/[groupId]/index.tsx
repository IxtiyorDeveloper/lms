import { Box } from "@mui/material";
// import { SingleGroupPage } from "app";
import withAuth from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import dynamic from "next/dynamic";

const SingleGroupPage = dynamic(() => import("app/groups/[groupId]"));

function GroupInside() {
  return (
    <Box mx="40px">
      <SingleGroupPage />
    </Box>
  );
}

export default withAuth(GroupInside, [COMPONENTS_VIEWS.can_view_group]);
