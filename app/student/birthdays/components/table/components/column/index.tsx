import React from "react";

import { CellNameWrapper, HeaderCell } from "./style";
import moment from "moment";
import {
  AntdInfoCell,
  AntdUserProfile,
  PhoneCell,
  SharpStarSvg,
  TableHeading,
} from "components";
import {
  DATE_FORMAT_SHOW_MMM_YYYY,
  DATE_FORMAT_YYYY_MM_DD,
} from "constants/dates";
import {
  NEW_STUDENT_ATTENDED,
  NEW_STUDENT_NOT_ATTENDED,
} from "constants/studentStatuses";
import { StudentType } from "types";
import { bgColors } from "styles/theme";
import { IUserPhone } from "types/userPhone";

export const getWaitingListColumns = () => {
  return [
    {
      dataIndex: ["user", "userProfile"],
      title: (
        <TableHeading isId padding>
          Name
        </TableHeading>
      ),
      render: (value: any, record: any, index: number) => {
        const user = record;
        const abs =
          user?.type == StudentType.TYPE_OLD &&
          (user.status.toString() === NEW_STUDENT_NOT_ATTENDED.toString() ||
            user.status.toString() === NEW_STUDENT_ATTENDED.toString()) ? (
            <div className="abs1">
              <SharpStarSvg color={bgColors.primary} />
            </div>
          ) : null;

        return (
          <AntdUserProfile
            props={record}
            propsValue={value}
            index={index}
            abs={abs}
          />
        );
      },
    },
    {
      title: <HeaderCell>Phone</HeaderCell>,
      dataIndex: ["user", "userPhones"],
      render: (value: IUserPhone[], record: any, index: number) => {
        return <PhoneCell value={value} />;
      },
    },
    {
      title: <TableHeading>Date</TableHeading>,
      dataIndex: ["user", "userProfile", "dob"],
      Cell: (props: any) => {
        return (
          <CellNameWrapper>
            <span className="name">
              {props.value
                ? moment(props.value, DATE_FORMAT_YYYY_MM_DD).format(
                    DATE_FORMAT_SHOW_MMM_YYYY
                  )
                : "-"}
            </span>
          </CellNameWrapper>
        );
      },
    },
    {
      title: <TableHeading isId>Group info</TableHeading>,
      dataIndex: "group",
      render: (value: any, record: any, index: number) => {
        return <AntdInfoCell record={record} value={value} />;
      },
    },
  ];
};
