import { EXAM_PROCESS } from "constants/exam";

export function sortOfPoint(students: any[] | undefined) {
  return (
    students?.sort((a, b) => {
      const A =
        a.process.data?.components?.reduce((total: any, curr: any) => {
          return total + curr.point;
        }, 0) || 0;
      const B =
        b.process.data?.components?.reduce((total: any, curr: any) => {
          return total + curr.point;
        }, 0) || 0;

      return B - A;
    }) || []
  );
}

export function sortStudentList(students: any[] | undefined) {
  const passStudents = students?.filter(
    (s) => s?.process?.status === EXAM_PROCESS.SUCCESS
  );

  const conditionalStudents = students?.filter(
    (s) => s?.process?.status === EXAM_PROCESS.CONDITIONAL
  );
  const failStudents = students?.filter(
    (s) => s?.process?.status === EXAM_PROCESS.FAIL
  );

  const notSetStudents = students?.filter(
    (s) => s?.process?.status === EXAM_PROCESS.NOT_SET
  );

  return [
    ...sortOfPoint(passStudents),
    ...sortOfPoint(conditionalStudents),
    ...sortOfPoint(failStudents),
    ...(notSetStudents || []),
  ];
}
