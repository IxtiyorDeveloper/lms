import { IExamStudent } from "types/exam/exam";
import { LESSON_DAY_MAIN_EXAM } from "constants/lessonDayEnums";

export const getPoint = ({
  part_id,
  studentExam,
  desiredValue,
}: {
  part_id: number | undefined;
  studentExam: IExamStudent | undefined;
  desiredValue: number;
}) => {
  if (desiredValue == LESSON_DAY_MAIN_EXAM) {
    const student_component = studentExam?.process?.data?.components?.filter(
      (f) => f.part_id == part_id,
    );

    return student_component?.reduce((acc, cur) => {
      return acc + +cur?.point;
    }, 0);
  } else {
    const student_component = studentExam?.process?.data?.components?.find(
      (f) => f.part_id == part_id,
    );

    return student_component?.point;
  }
};
