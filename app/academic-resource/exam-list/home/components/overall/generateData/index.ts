import { textColors } from "styles/theme";
import { EXAM_PROCESS_ATTENDANCE_STATUS } from "constants/exam";
import { NextRouter } from "next/router";

export const generateData = ({
                               year,
                               month,
                               router,
                               counts,
                             }: {
  year: string;
  month: string;
  router: NextRouter;
  counts: any;
}) => {
  const students = counts?.students;
  const attendance = counts?.attendance;
  return [
    {
      count: students?.total_students,
      title: "Students",
      color: textColors.sceptreBlue,
      route: router.asPath,
    },
    {
      count: students?.passed_students,
      title: "Pass",
      color: textColors.midori,
      percentage:
          ((students?.passed_students || 0) * 100) /
          (students?.total_students || 1),
      route: {
        pathname: "/academic-resource/exam-list/students",
        query: {
          ...router.query,
          process_status: 40000,
          year,
          month,
        },
      },
    },
    {
      count: students?.failed_students,
      percentage:
          ((students?.failed_students || 0) * 100) /
          (students?.total_students || 1),
      title: "Fail",
      color: textColors.pop,
      route: {
        pathname: "/academic-resource/exam-list/students",
        query: {
          ...router.query,
          process_status: 10000,
          year,
          month,
        },
      },
    },
    {
      count: students?.conditional_students,
      percentage:
          ((students?.conditional_students || 0) * 100) /
          (students?.total_students || 1),
      title: "Condition",
      color: textColors.kenyan,
      route: {
        pathname: "/academic-resource/exam-list/students",
        query: {
          ...router.query,
          process_status: 30000,
          year,
          month,
        },
      },
    },
    {
      count: attendance?.full_absents,
      percentage:
          ((attendance?.full_absents || 0) * 100) /
          (students?.total_students || 1),
      title: "Full Abs",
      color: textColors.sceptreBlue,
      route: {
        pathname: "/academic-resource/exam-list/students",
        query: {
          ...router.query,
          attendance_status: EXAM_PROCESS_ATTENDANCE_STATUS.FULL_ABS,
          year,
          month,
        },
      },
    },
    {
      count: attendance?.partial_absents,
      percentage:
          ((attendance?.partial_absents || 0) * 100) /
          (students?.total_students || 1),
      title: "Partial Abs",
      color: textColors.sceptreBlue,
      route: {
        pathname: "/academic-resource/exam-list/students",
        query: {
          ...router.query,
          attendance_status: EXAM_PROCESS_ATTENDANCE_STATUS.PARTIAL_ABS,
          year,
          month,
        },
      },
    },
  ];
};
