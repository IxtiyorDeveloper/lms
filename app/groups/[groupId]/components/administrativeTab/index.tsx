import React, { FC, useMemo } from "react";
import { IAdministrativeTable } from "./type";
import { AntdTable } from "components";
import Column from "./column";
import {
  STOPPING_STUDENT,
  TRANSFERRED_STUDENT,
} from "constants/studentStatuses";
import { sortStudents } from "./sortStudents";
import { ColumnGroupType } from "antd/lib/table";
import { TableWrapper } from "./style";

export type TModal = "payment";

const AdministrativeTable: FC<IAdministrativeTable> = ({
  isLoading,
  group,
}) => {
  const contacts = useMemo(() => group?.allContacts, [group]);
  const groupContacts = useMemo(() => sortStudents(contacts), [contacts]);
  const divideRowNumber = useMemo(() => {
    if (
      groupContacts?.some(
        (contact) => contact.status.toString() == TRANSFERRED_STUDENT
      )
    ) {
      return (
        groupContacts?.findIndex(
          (group) => group?.status.toString() == TRANSFERRED_STUDENT
        ) + 1
      );
    } else {
      if (
        groupContacts?.some(
          (contact) => contact.status.toString() == STOPPING_STUDENT
        )
      ) {
        return (
          groupContacts?.findIndex(
            (group) => group?.status.toString() == STOPPING_STUDENT
          ) + 1
        );
      }
    }
  }, [groupContacts]);

  return (
    <TableWrapper divideRowNumber={divideRowNumber}>
      <AntdTable
        columns={Column({ group }) as unknown as ColumnGroupType<any>[]}
        dataSource={groupContacts ?? []}
        loading={isLoading}
        rowClassName={(record) => {
          return `row-${record.status}`;
        }}
      />
    </TableWrapper>
  );
};

export default AdministrativeTable;
