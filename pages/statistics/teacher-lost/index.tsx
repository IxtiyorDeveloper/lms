import React from "react";
// import { TeacherLost } from "app";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const TeacherLost = dynamic(() => import("app/statistics/teacherLost"));
const TeacherLostPage = () => {
  return <TeacherLost />;
};

export default withAuth(TeacherLostPage);
