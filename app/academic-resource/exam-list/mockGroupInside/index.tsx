import React, { useEffect } from "react";
import moment from "moment";
import { expand } from "./expand";
import { TableC } from "./components";
import { useRouter } from "next/router";
import { bgColors } from "styles/theme";
import { EXAM_PARTS } from "constants/exam";
import { ExamDateTime, Wrapper } from "./style";
import { useExamResultStudentsByStatus, useGroupMockExamData } from "hooks";
import { GroupInsideHeaderInfo, LearningSvg, SpeakingSvg } from "components";
import { expandQuery } from "../home/failedStudents/components/table/expand";
import ConditionPass from "globals/components/conditionalPass";
import ExamAttendance from "globals/components/examAttendance";
import { StudentType } from "types";

const MockGroupExamResult = () => {
  const router = useRouter();
  const { data, isLoading } = useGroupMockExamData({
    query_params: {
      ...router.query,
      group_id: router.query.groupId,
      expand:
        "studentProfile.mockExam.dataResult, studentProfile.level_name, teacher.userProfile,support.userProfile,exam_parts,group.branch,group.lessonDay,group.level,group.room,group.room, exam_parts.config.components",
      groupId: undefined,
      groupExamId: undefined,
    },
  });

  const { data: users } = useExamResultStudentsByStatus({
    user_id: data?.list?.map((student: any) => student?.user_id) || [],
    expand: expandQuery,
    page: router.query?.page,
    type: [StudentType.TYPE_NEW, StudentType.TYPE_OLD, StudentType.TYPE_BANNED],
  });

  const mainDate = data?.group?.exam_parts?.filter(
    (part: any) => part.config.type === EXAM_PARTS.MAIN
  )[0];

  const speakingDate = data?.group?.exam_parts?.filter(
    (part: any) => part.config.type === EXAM_PARTS.SPEAKING
  )[0];

  useEffect(() => {
    if (data) {
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          groupExamId: data?.group?.group_id,
        },
      });
    }
  }, [data]);

  return (
    <Wrapper>
      <ConditionPass />
      <ExamAttendance />
      <GroupInsideHeaderInfo id={data?.group?.group_id} />
      <div className="inside">
        <ExamDateTime>
          <div>
            <span>
              <LearningSvg color={bgColors.dark} width={15} height={15} />
            </span>
            <span>
              Main -{" "}
              {mainDate?.date
                ? moment(mainDate?.date + " " + mainDate?.time).format(
                    "DD - MMMM YYYY HH:mm"
                  )
                : "-- - -- - ---- ---- --:--"}
            </span>
          </div>
          <div className="divider"></div>
          <div>
            <span>
              <SpeakingSvg color={bgColors.dark} width={15} height={15} />
            </span>
            <span>
              Speaking -{" "}
              {speakingDate?.date
                ? moment(speakingDate?.date + " " + speakingDate?.time).format(
                    "DD - MMMM YYYY HH:mm"
                  )
                : "-- - -- - ---- ---- --:--"}
            </span>
          </div>
        </ExamDateTime>
        <TableC
          users={users}
          parts={data?.group?.exam_parts as any}
          data={data?.list}
          loading={isLoading}
        />
      </div>

    </Wrapper>
  );
};

export default MockGroupExamResult;
