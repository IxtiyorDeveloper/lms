import { IExam } from "types/exam/exam";

export const generateExamName = ({
  day,
  exam,
}: {
  day: string;
  exam: IExam | undefined;
}) => {
  const exam_part = exam?.exam_parts?.find((f) => f.date == day);
  return exam_part?.config?.name ?? "Exam";
};
