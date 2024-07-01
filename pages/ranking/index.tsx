import React from "react";
import withAuth from "utils/guard";
import dynamic from "next/dynamic";

const TeacherRanking = dynamic(() => import("app/ranking/home"));

const TeacherRankingPage = () => {
  return <TeacherRanking />;
};

export default withAuth(TeacherRankingPage, []);
