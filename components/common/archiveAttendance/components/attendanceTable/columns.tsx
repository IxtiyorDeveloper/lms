import {
  EAttendanceStatuses,
  EStudentAttendance,
  IFetchList,
  IGroup,
} from "types";
import { IAttendance } from "types/attendance";
import { IArsTeacher, IProgress } from "types/ars/teacher";
import { GROUP_FORM_GROUP, GROUP_FORM_INDIVIDUAL } from "constants/groupForms";
import GroupColumns from "./components/groupColumns";
import IndividualColumns from "./components/individualColumns";

export const obj = {
  [EAttendanceStatuses.CAME]: EStudentAttendance.CAME,
  [EAttendanceStatuses.NOT_CAME]: EStudentAttendance.NOT_CAME,
  [EAttendanceStatuses.ABS]: EStudentAttendance.ABS,
  [EAttendanceStatuses.UNAVAILABLE]: EStudentAttendance.UNAVAILABLE,
  [EAttendanceStatuses.ADD]: EStudentAttendance.ADD,
  [EAttendanceStatuses.WHITE]: EStudentAttendance.WHITE,
};

const Columns: ({
  data,
  lessonDays,
  units,
  studentScores,
  group,
  isLoading,
}: {
  lessonDays?: IGroup;
  data?: IFetchList<IAttendance> | undefined;
  units?: IArsTeacher[];
  studentScores: IProgress[] | undefined;
  group: IGroup | undefined;
  isLoading: boolean;
}) => any[] = ({
  data,
  lessonDays,
  units,
  studentScores,
  isLoading,
  group,
}) => {
  const columns: { [key: string]: any } = {
    [GROUP_FORM_GROUP]: GroupColumns({
      data,
      lessonDays,
      units,
      studentScores,
      group,
      isLoading,
    }),
    [GROUP_FORM_INDIVIDUAL]: IndividualColumns({
      data,
      lessonDays,
      units,
      studentScores,
      group,
      isLoading,
    }),
  };
  return columns?.[
    (group?.groupType?.group_form as string) || GROUP_FORM_GROUP
  ];
};

export default Columns;
