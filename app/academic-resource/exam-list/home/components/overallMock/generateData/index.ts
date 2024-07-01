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
  return [
    {
      count: counts?.total_students,
      title: "Students",
      color: textColors.sceptreBlue,
      route: router.asPath,
    },
    {
      count: counts?.passed_students,
      title: "Pass",
      color: textColors.midori,
      percentage:
        ((counts?.passed_students || 0) * 100) / (counts?.total_students || 1),
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
      count: counts?.failed_students,
      percentage:
        ((counts?.failed_students || 0) * 100) / (counts?.total_students || 1),
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
      count: counts?.conditional_students,
      percentage:
        ((counts?.conditional_students || 0) * 100) /
        (counts?.total_students || 1),
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
      count: counts?.full_absents,
      percentage:
        ((counts?.full_absents || 0) * 100) / (counts?.total_students || 1),
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
      count: counts?.partial_absents,
      percentage:
        ((counts?.partial_absents || 0) * 100) / (counts?.total_students || 1),
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

export const generateMockExamData = ({
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
      count: students?.processing_count,
      percentage:
        ((students?.processing_count || 0) * 100) /
        (students?.total_students || 1),
      title: "In progress",
      color: textColors.deep,
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
      count: students?.not_done_students,
      percentage:
        ((students?.not_done_students || 0) * 100) /
        (students?.total_students || 1),
      title: "Not done",
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
      count: counts?.average,
      percentage:
        ((counts?.average || 0) * 100) / (students?.total_students || 1),
      title: "Average score",
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
