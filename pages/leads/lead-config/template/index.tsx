import React from "react";
// import { CreateTemplatePage } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const CreateTemplatePage = dynamic(
  () => import("app/leads/leadConfig/createTemplate")
);
const LeadCreateTemplatePage = () => {
  return <CreateTemplatePage />;
};
export default withAuth(LeadCreateTemplatePage, []);
