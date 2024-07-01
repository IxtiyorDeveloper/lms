import React from "react";
import withAuth from "utils/guard";
import { PAGE_VISITS } from "constants/permissions";
import { GroupExamResult } from "app";
import dynamic from "next/dynamic";
// const GroupExamResult = dynamic(
//   () => import("app/academic-resource/exam-list/groupInside")
// );
const GroupExam = () => {
  return <GroupExamResult />;
};

export default withAuth(GroupExam, [PAGE_VISITS.can_visit_exam_results_page]);
