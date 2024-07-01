import React, { FC, useMemo } from "react";
import Columns from "./columns";
import { IFetchList, IGroup } from "types";
import { IAttendance } from "types/attendance";
import { IArsTeacher, IProgress } from "types/ars/teacher";
import { Wrapper } from "./style";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import { deleteDuplicates } from "../functions/deleteDuplicateGroupContacts";
import { AntdTable } from "components/index";

interface IAttendanceTable {
  group: IGroup | undefined;
  attendance: IFetchList<IAttendance> | undefined;
  lessonDays: IGroup | undefined;
  units: IArsTeacher[] | undefined;
  studentScores: IProgress[] | undefined;
  isLoading: boolean;
}

const AttendanceTable: FC<IAttendanceTable> = ({
  group,
  attendance,
  lessonDays,
  units,
  studentScores,
  isLoading,
}) => {
  const contacts = useMemo(
    () =>
      group?.allContactsWithMonth?.filter(
        (c) =>
          c.status?.toString() !== NEW_STUDENT_NOT_ATTENDED.toString() &&
          c.status?.toString() !== NEW_STUDENT_ATTENDED.toString() &&
          c.status?.toString() !== TRANSFERRING_STUDENT.toString()
      ),
    [group]
  );

  return (
    <Wrapper>
      <AntdTable
        columns={Columns({
          data: attendance,
          lessonDays,
          units,
          studentScores,
          group,
          isLoading,
        })}
        dataSource={deleteDuplicates(contacts) ?? []}
        pagination={false}
        bordered
        loading={isLoading}
        scroll={{ x: "auto" }}
      />
    </Wrapper>
  );
};
export default AttendanceTable;
