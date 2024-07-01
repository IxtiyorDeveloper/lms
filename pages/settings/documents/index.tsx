import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import dynamic from "next/dynamic";

const Documents = dynamic(() => import("app/settings/documents/home"));
const DocumentsPage = () => {
  return <Documents />;
};

export default withAuth(DocumentsPage, [
  PAGE_VISITS.can_visit_settings_documents_page,
]);
