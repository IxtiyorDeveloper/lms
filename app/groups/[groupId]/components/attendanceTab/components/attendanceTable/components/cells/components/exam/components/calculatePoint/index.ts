import { IExamPart, IExamStudent } from "types/exam/exam";
import { EResultEnum } from "../../type";
import { getPoint } from "./getPoint";

export const calculatePoint = ({
  studentExam,
  exam_part,
  desiredValue,
}: {
  studentExam: IExamStudent | undefined;
  exam_part: IExamPart | undefined;
  desiredValue: number;
}) => {
  const overall =
    exam_part?.config?.components?.reduce((acc, cur) => {
      return acc + +(cur.max_point || 0);
    }, 0) || 0;

  const part_id = exam_part?.config?.id;

  const point = getPoint({ part_id, studentExam, desiredValue });

  const result = Number(((point * 100) / overall).toFixed(2));

  const attendance = studentExam?.process?.data?.attendance?.find(
    (a) => a.id == part_id,
  );

  if (isNaN(result)) {
    return {
      amount: 0,
      type: EResultEnum.NON_EXIST,
      attendance,
    };
  } else {
    return {
      amount: point,
      type: EResultEnum.EXIST,
      attendance,
    };
  }
};
