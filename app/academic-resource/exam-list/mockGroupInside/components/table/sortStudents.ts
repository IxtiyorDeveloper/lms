import { EXAM_PROCESS, MockExamStatus } from "constants/exam";
import { IMockExamDataGroupStudents } from "types/exam/exam";

export function sortOfPoint(students: any[] | undefined) {
  return (
    students?.sort(
      (a: IMockExamDataGroupStudents, b: IMockExamDataGroupStudents) => {
        const A =
          a.studentProfile?.mockExam?.dataResult?.components?.reduce(
            (total: any, curr: any) => {
              return total + curr.point;
            },
            0,
          ) || 0;
        const B =
          b.studentProfile?.mockExam?.dataResult?.components?.reduce(
            (total: any, curr: any) => {
              return total + curr.point;
            },
            0,
          ) || 0;

        return B - A;
      },
    ) || []
  );
}

export function sortStudentList(students: any[] | undefined) {
  const failStudents = students?.filter(
    (s: IMockExamDataGroupStudents) =>
      !s?.studentProfile.mockExam &&
      s?.studentProfile?.mockExam?.status == MockExamStatus.FINISHED,
  );

  const passStudents = students?.filter((s: IMockExamDataGroupStudents) => {
    return (
      s?.studentProfile?.mockExam?.passed == 1 &&
      s?.studentProfile?.mockExam?.status == MockExamStatus.FINISHED
    );
  });
  const inProgressStudents = students?.filter(
    (s: IMockExamDataGroupStudents) => {
      return s?.studentProfile?.mockExam?.status == MockExamStatus.IN_PROGRESS;
    },
  );
  const notDoneStudents = students?.filter(
    (s) =>
      !s?.studentProfile?.mockExam?.status &&
      (s?.studentProfile?.mockExam?.passed === null ||
        s?.studentProfile?.mockExam?.passed === undefined),
  );
  return [
    ...sortOfPoint(passStudents),
    ...sortOfPoint(inProgressStudents),
    ...sortOfPoint(failStudents),
    ...(notDoneStudents || []),
  ];
}
