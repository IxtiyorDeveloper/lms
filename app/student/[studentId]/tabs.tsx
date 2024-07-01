import React, { useMemo } from "react";
import {
  AttendanceSvg,
  ExamSvg,
  ProgressSvg,
  RadarSvg,
  VocabularySvg,
} from "components";
import { AttendanceTab, Progress } from "./components";
import { OneStudent } from "types/student";
import Radar from "./components/radar";
import Exam from "./components/exam";
import Vocabulary from "./components/vocabulary";

interface Interface {
  student: OneStudent | undefined;
  isLoading: boolean;
}

const Tabs = ({ student, isLoading }: Interface) => {
  return useMemo(
    () => [
      {
        label: "Attendance",
        icon: AttendanceSvg,
        children: <AttendanceTab student={student} isLoading={isLoading} />,
      },
      {
        label: "Progress",
        icon: ProgressSvg,
        children: <Progress level_id={student?.level?.parent_id} />,
      },
      {
        label: "Radar",
        icon: RadarSvg,
        children: <Radar level_id={student?.level?.parent_id} />,
      },
      {
        label: "Vocabulary",
        icon: VocabularySvg,
        children: <Vocabulary level_id={student?.level?.parent_id} />,
      },
      {
        label: "Exam",
        icon: ExamSvg,
        children: (
          <Exam
            level={student?.level?.id}
            studentId={student?.user_id}
            subLevel="asdasd"
          />
        ),
      },
    ],
    [student]
  );
};

export default Tabs;
