import { Box } from "@mui/material";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const StaffGroup = dynamic(
  () => import("app/settings/staffSettings/[staffsGroupId]")
);

function StaffsListTable(props: any) {
  return (
    <Box mx="40px">
      <StaffGroup {...props} />
    </Box>
  );
}

export default withAuth(StaffsListTable, [
  PAGE_VISITS.can_visit_settings_staff_settings_page,
]);
