import React, { useMemo } from "react";
import { AntdUserProfile, TableHeading, PhoneCell } from "components";
import { Flex } from "./style";
import { IUserPhone } from "types/userPhone";

const Columns = () => {
  return useMemo(
    () => [
      {
        title: (
          <TableHeading isId padding>
            Name
          </TableHeading>
        ),
        dataIndex: ["groupContact", "user", "userProfile"],
        render: (value: any, record: any, index: number) => {
          return (
            <AntdUserProfile
              props={record?.groupContact}
              propsValue={value}
              index={index}
            />
          );
        },
      },
      {
        title: <TableHeading>Phone</TableHeading>,
        dataIndex: ["groupContact", "user", "userPhones"],
        render: (value: IUserPhone[], record: any, index: number) => {
          return <PhoneCell value={value} />;
        },
      },
      {
        title: <TableHeading>Group</TableHeading>,
        dataIndex: "createdBy",
        render: (value: any, record: any, index: number) => {
          return <Flex>{record?.groupContact?.group?.name}</Flex>;
        },
      },
      {
        title: <TableHeading>Topic</TableHeading>,
        dataIndex: "topic",
        render: (value: any, record: any, index: number) => {
          return <Flex>{value ?? "-"}</Flex>;
        },
      },
    ],
    []
  );
};

export default Columns;
