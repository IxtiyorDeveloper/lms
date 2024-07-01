import React from "react";
// import { BannedStudents } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const BannedStudents = dynamic(() => import("app/student/banned-students"));
const BannedStudentsPage = () => {
  return <BannedStudents />;
};

export default withAuth(BannedStudentsPage);
