import React, { useEffect } from "react";
import moment from "moment";
import { expand } from "./expand";
import { TableC } from "./components";
import { useRouter } from "next/router";
import { bgColors } from "styles/theme";
import { EXAM_PARTS } from "constants/exam";
import { ExamDateTime, Wrapper } from "./style";
import { useExamResultStudentsByStatus, useGroupExamData } from "hooks";
import { LearningSvg, SpeakingSvg } from "components";
import { expandQuery } from "../home/failedStudents/components/table/expand";
import ConditionPass from "globals/components/conditionalPass";
import ExamAttendance from "globals/components/examAttendance";
import { StudentType } from "types";
import GroupInsideHeaderInfo from "./components/groupInsideHeaderInfo";

const GroupExamResult = () => {
  const router = useRouter();
  const { data, isLoading } = useGroupExamData({
    ...router.query,
    group_id: router.query.groupId,
    expand,
    groupId: undefined,
    groupExamId: undefined,
  });

  const { data: users, isLoading: isUserLoading } =
    useExamResultStudentsByStatus({
      user_id: data?.students?.map((student: any) => student?.user_id) || [],
      expand: expandQuery,
      page: router.query?.page,
      type: [
        StudentType.TYPE_NEW,
        StudentType.TYPE_OLD,
        StudentType.TYPE_BANNED,
      ],
    });

  const mainDate = data?.exam_parts?.filter(
    (part: any) => part.config.type === EXAM_PARTS.MAIN,
  )[0];

  const speakingDate = data?.exam_parts?.filter(
    (part: any) => part.config.type === EXAM_PARTS.SPEAKING,
  )[0];

  useEffect(() => {
    if (data) {
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          groupExamId: data.id,
        },
      });
    }
  }, [data]);

  return (
    <Wrapper>
      <ConditionPass />
      <ExamAttendance />
      <GroupInsideHeaderInfo data={data} />
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
                    "DD - MMMM YYYY HH:mm",
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
                    "DD - MMMM YYYY HH:mm",
                  )
                : "-- - -- - ---- ---- --:--"}
            </span>
          </div>
        </ExamDateTime>
        <TableC
          users={users}
          parts={data?.exam_parts}
          data={data?.students}
          loading={isLoading || isUserLoading}
        />
      </div>
    </Wrapper>
  );
};

export default GroupExamResult;
