import React from "react";
// import { StudentHome } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const StudentHome = dynamic(() => import("app/student/[studentId]"));

const Student = () => {
  return <StudentHome />;
};

export default withAuth(Student);
