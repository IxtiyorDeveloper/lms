import { OutgoingRestructuredObject } from "../../functions";
import { ICoverTeacherComponent } from "types/finance/salary";

function sortByDate(data: ICoverTeacherComponent[]) {
  // Custom sorting function
  function compareDates(
    a: { data: { date: string | number | Date } },
    b: { data: { date: string | number | Date } }
  ) {
    const dateA: any = new Date(a.data.date);
    const dateB: any = new Date(b.data.date);
    return dateA - dateB;
  }

  // Sort the data array using the compareDates function
  data.sort(compareDates);

  return data; // Return the sorted array
}

export function calculateTotalScore(data: OutgoingRestructuredObject) {
  return data.user_covers.reduce((total, student) => {
    const studentTotalScore = student.data.reduce(
      (sum, course) => sum + (parseFloat(course.pair.value) || 0),
      0
    );
    return total + studentTotalScore;
  }, 0);
}

export function mergeUserCoversIntoArray(data: OutgoingRestructuredObject) {
  return sortByDate(
    data.user_covers.flatMap((student) => {
      return student.data?.map((item) => ({
        ...item,
        user_assignment: student.user,
      }));
    })
  );
}
