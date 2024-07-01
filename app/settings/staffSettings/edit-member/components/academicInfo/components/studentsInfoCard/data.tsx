import { ANALYTICS } from "./type";

const studentData = ({ data }: { data: any | undefined }) => {
  const studentData: any[] = [
    {
      title: "Active students",
      type: ANALYTICS.ACTIVE,
      value: data?.active_student_count || 0,
    },
    {
      title: "New students",
      type: ANALYTICS.NEW,
      value: data?.new_student_count ?? 0,
      extra: data,
    },
    {
      title: "Lost",
      type: ANALYTICS.LOST,
      value: data?.lost_count || 0,
    },
    {
      title: "Potential fail",
      type: ANALYTICS.POTENTIAL_FAIL,
      value: data?.fallible_count || 0,
    },
    {
      title: "Absent",
      type: ANALYTICS.ABSENT,
      value: data?.abs_count || 0,
    },
    {
      title: "Red list",
      type: ANALYTICS.RED_LIST,
      value: data?.redListStudentCount || 0,
    },
    {
      title: "Black list",
      type: ANALYTICS.BLACK_LIST,
      value: data?.blackListStudentCount || 0,
    },
  ];
  return studentData;
};

export default studentData;
