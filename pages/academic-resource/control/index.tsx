import React from "react";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const AcademicControl = dynamic(() => import("app/academic-resource/control"));

const AcademicControlPage = () => {
  return <AcademicControl />;
};

export default withAuth(AcademicControlPage, []);
