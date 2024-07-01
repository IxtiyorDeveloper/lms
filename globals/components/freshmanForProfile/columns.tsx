import React, { useMemo } from "react";
import { AntdUserProfile, PhoneCell, TableHeading } from "components";
import { IUserPhone } from "types/userPhone";

const Columns = () => {
  return useMemo(
    () => [
      {
        dataIndex: ["user", "userProfile"],
        title: (
          <TableHeading padding isId>
            Name
          </TableHeading>
        ),
        render: (value: any, record: any, index: number) => {
          return (
            <AntdUserProfile
              props={record}
              propsValue={value}
              index={index}
              isMark
              isFreshman
            />
          );
        },
      },
      {
        title: (
          <TableHeading style={{ minWidth: "80px", width: "90px" }}>
            Phone number
          </TableHeading>
        ),
        dataIndex: ["user", "userPhones"],
        render: (value: IUserPhone[], record: any, index: number) => {
          return <PhoneCell value={value} />;
        },
      },
    ],
    []
  );
};

export default Columns;
