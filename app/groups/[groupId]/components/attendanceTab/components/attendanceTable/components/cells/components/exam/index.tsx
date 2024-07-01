import React from "react";
import { IExam, IExamProcess } from "types/exam/exam";
import { ExamDateWrapper } from "../../style";
import { HolidaySvg } from "components";
import { getCurrentRowSpan, groupDates } from "utils/groupItemsToArray";
import { EAttendanceStatuses, IGroup, TStatuses } from "types";
import { calculatePoint } from "./components/calculatePoint";
import { bgColors } from "styles/theme";
import { Container, MarksWrapper, Unavailable } from "./style";
import { EnumExamAbs } from "constants/exam";
import { identifyBg } from "./components/identifyBg";

const inner = ({
  borderColor,
  score,
  process,
}: {
  borderColor: string;
  score: number | string;
  process: IExamProcess | undefined;
}) => {
  let { bg, color } = identifyBg({ process });
  return (
    <Container borderColor={borderColor}>
      <MarksWrapper bgColor={bg} color={color}>
        {score}%
      </MarksWrapper>
    </Container>
  );
};
const ExamCell = ({
  exam,
  rowIndex,
  rowLength,
  value,
  lessonDays,
  day,
  record,
  status,
  desiredValue,
}: {
  exam?: IExam;
  rowIndex: number;
  rowLength: number;
  value: { [p: string]: 100 | 200 | 300 };
  lessonDays: IGroup | undefined;
  status: TStatuses | EAttendanceStatuses;
  day: string;
  record: any;
  desiredValue: 100 | 150;
}) => {
  const user_id = record?.user?.id;
  const studentExam = exam?.students?.find((f) => f.user_id == user_id);
  const exam_part = exam?.exam_parts?.find((f) => f.date == day);

  const { amount, attendance } = calculatePoint({
    studentExam,
    exam_part,
    desiredValue,
  });

  const attendanceStatus = attendance?.status;

  const content = () => {
    const object = {
      [EnumExamAbs.ATTENDED]: inner({
        borderColor: bgColors.midori,
        score: amount,
        process: studentExam?.process,
      }),
      [EnumExamAbs.ABSENT]: inner({
        borderColor: bgColors.pop,
        score: amount,
        process: studentExam?.process,
      }),
    };

    if (exam_part && !attendance && !!studentExam) {
      return inner({
        borderColor: bgColors.transparent,
        score: amount,
        process: studentExam?.process,
      });
    } else {
      if (status == EAttendanceStatuses.UNAVAILABLE) {
        return (
          <Unavailable>
            <div className="inner"></div>
          </Unavailable>
        );
      } else {
        return object[attendanceStatus as keyof typeof object];
      }
    }
  };

  if (exam) return content();
  else
    return {
      children: (
        <ExamDateWrapper>
          <HolidaySvg />
          <p>Exam</p>
        </ExamDateWrapper>
      ),
      props: {
        rowSpan: getCurrentRowSpan({
          rowIndex,
          rowLength,
          value,
        }),
        colSpan: groupDates({
          data: lessonDays?.allDays,
          desiredValue,
          targetDate: day,
        }),
      },
    };
};

export default ExamCell;
