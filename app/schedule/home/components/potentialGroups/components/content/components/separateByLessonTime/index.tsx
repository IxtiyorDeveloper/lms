import { IPotentialGroup } from "types";

export function separateByLessonTimeId({
  data,
  day_id,
}: {
  data?: IPotentialGroup[];
  day_id?: string;
}) {
  const lessonTimeMap: any = {};
  if (data) {
    data.forEach((item: IPotentialGroup) => {
      const lessonTimeId = item.lesson_time_id;

      if (!lessonTimeMap[lessonTimeId]) {
        lessonTimeMap[lessonTimeId] = {
          lesson_time_id: lessonTimeId,
          related_groups: [],
        };
      }
      if (item.lesson_day_id == day_id) {
        lessonTimeMap[lessonTimeId].related_groups.push(item);
      }
    });

    Object.values(lessonTimeMap).forEach((group: any) => {
      group?.related_groups.sort(
        (a: { student_count: string }, b: { student_count: string }) =>
          parseInt(b.student_count) - parseInt(a.student_count),
      );
    });

    return Object.values(lessonTimeMap);
  } else {
    return [];
  }
}
