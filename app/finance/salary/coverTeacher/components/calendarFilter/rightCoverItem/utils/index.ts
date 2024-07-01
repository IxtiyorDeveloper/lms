import { IRestructuredCover } from "../../content/type";

export function calculateTotalScore(data: IRestructuredCover) {
  return data.covers_for_teacher?.reduce((total, student) => {
    const studentTotalScore = student.user_covers.reduce(
      (sum, course) =>
        sum + Math.abs(parseFloat(course.value?.toString()) || 0),
      0
    );
    return total + studentTotalScore;
  }, 0);
}

export function mergeCoversIntoArray(data: IRestructuredCover) {
  return data.covers_for_teacher.flatMap((student) => student.user_covers);
}
