import React from "react";
import { TeacherWrapper } from "./style";
import Filter from "./components/filter";
import TableComponent from "./components/table";
import { UpdateStudentFlow } from "globals/components";
import { useRouter } from "next/router";
import { useTeacherLostList } from "hooks";
import moment from "moment/moment";
import { useTeacherRanking } from "hooks/useAcademicControl";

const TeacherLost = () => {
  const router = useRouter();
  const { data, isLoading } = useTeacherLostList({
    query_params: {
      teacher_id: router.query.teacher_id || null,
      level_id: router.query.level_id || null,
      branches: router.query.branch_id || null,
      year: router.query.year || moment().year(),
      month: router.query.month || moment().month() + 1,
      expand:
        "teachers.lostCountByLeavingCategory,teachers.user,teachers.user.userProfile.avatar.children,teachers.lost_count,teachers.lostGroupCount",
    },
  });
  const { data: ranking, isLoading: loading } = useTeacherRanking({
    query_params: {
      year: router.query.year || moment().year(),
      month: router.query.month || moment().month() + 1,
      type: "100",
    },
  });
  return (
    <TeacherWrapper>
      <UpdateStudentFlow />
      <Filter data={data} />
      <TableComponent
        data={data}
        isLoading={isLoading || loading}
        ranking={ranking?.data}
      />
    </TeacherWrapper>
  );
};

export default TeacherLost;
