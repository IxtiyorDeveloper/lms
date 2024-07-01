import React, { FC, Fragment } from "react";
import Recommendations from "./components/recommendations";
import { IStudentTransfer } from "./type";
import {
  useAdminStudentRecommendedGroups,
  useGetOneStudent,
  usePageDataMemo,
} from "hooks";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { getFilteredRecommendation, Preferences, SearchCard } from "components";
import { EStudentMatchType, EStudentStrict } from "types/student/waitingList";
import { expand } from "./expand";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";

const RecommendationStudent: FC<IStudentTransfer> = ({ studentId }) => {
  const selects = usePageDataMemo();

  const router = useRouter();

  const {
    isLoading: isLoadingStudent,
    isPreviousData: isStudentPrevious,
    data: student,
  } = useGetOneStudent({
    id: studentId,
    type: "update",
    custom_search: undefined,
  });

  const { custom_search, ...rest } = router.query;

  const { data: recommendation, isLoading } = useAdminStudentRecommendedGroups({
    query_params: {
      id: studentId,
      ...rest,
      types: [
        EStudentMatchType.FULL,
        EStudentMatchType.NO_MATCH,
        EStudentMatchType.PARTIAL,
      ],
      expand,
      level_id: student?.level?.id,
      course_id: student?.course?.id,
      group_type_id: student?.groupType?.id,
      strict_by_branch: student?.strictPreferences?.[EStudentStrict.BRANCH],
      strict_by_level: student?.strictPreferences?.[EStudentStrict.LEVEL],
      strict_by_time: student?.strictPreferences?.[EStudentStrict.TIME],
      strict_by_day: student?.strictPreferences?.[EStudentStrict.DAY],
      branch_id: student?.preferBranches?.map((p) => p.branch?.id),
      lesson_day_id: student?.preferDays?.map((item) => item.day?.id),
      lesson_time_id: student?.preferTimes?.map((item) => item.time?.id),
      teacher_id: student?.preferMentors?.map((p) => p.mentor.id),
      start_date: student?.startDateLabel?.datetime
        ? moment(student?.startDateLabel?.datetime).format(
            DATE_FORMAT_YYYY_MM_DD,
          )
        : null,
    },
    enabled: !!student?.level?.id,
  });

  return (
    <Fragment>
      <Spin spinning={isLoading || isLoadingStudent || isStudentPrevious}>
        <Preferences
          student={student}
          isLoading={isLoadingStudent || isStudentPrevious}
          back_waiting_list
        />
        <SearchCard selects={selects} />
        <Recommendations
          data={getFilteredRecommendation({ recommendation })}
          student={student}
        />
      </Spin>
    </Fragment>
  );
};

export default RecommendationStudent;
