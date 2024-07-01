import React, { useMemo } from "react";
import {
  TableHeading,
  PhoneCell,
  PeriodsCell,
  PaymentInfo,
  Cell,
  AntdUserProfile,
  AntdInfoCell,
  StudentLabels,
} from "components";
import moment from "moment";
import {
  DATE_FORMAT_DD_MMM_YYYY_HH_mm,
  DATE_FORMAT_SHOW_MMM_YYYY,
} from "constants/dates";
import { funcCheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { STUDENT_FLOW_RESPONSIBLE_TYPE_ADMIN } from "constants/studentFlow";
import { IUserPhone } from "types/userPhone";
import { queryKeys } from "constants/queryKeys";

export const Columns = () => {
  return useMemo(() => {
    return [
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
      {
        title: <TableHeading>Periods</TableHeading>,
        dataIndex: "periods",
        render: (value: any, record: any, index: number) => {
          return (
            <PeriodsCell
              row={record?.currentGroupContact}
              queryKeys={[queryKeys.freshman_list]}
            />
          );
        },
      },
      {
        title: <TableHeading>Group info</TableHeading>,
        dataIndex: ["currentGroupContact", "group"],
        render: (value: any, record: any, index: number) => {
          return <AntdInfoCell record={record} value={value} />;
        },
      },
      funcCheckPermission([COMPONENTS_VIEWS.can_see_student_payment]) && {
        title: <TableHeading>Payment</TableHeading>,
        accessor: "actualPayment",
        render: (value: any, record: any, index: number) => {
          const user: any = record?.currentGroupContact;
          return <PaymentInfo user={user} group={user?.group} />;
        },
      },
      {
        title: <TableHeading>Added date</TableHeading>,
        dataIndex: ["currentGroupContact", "added_date"],
        render: (value: any, record: any, index: number) => {
          return (
            <Cell style={{ fontWeight: 600 }}>
              {moment(value).format(DATE_FORMAT_SHOW_MMM_YYYY)}
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Created by</TableHeading>,
        dataIndex: ["freshmanFlow", "studentFlowResponsibles"],
        render: (value: any, record: any, index: number) => {
          const currentValue = value?.find(
            (res: { type: { toString: () => string } }) =>
              res.type?.toString() ===
              STUDENT_FLOW_RESPONSIBLE_TYPE_ADMIN?.toString()
          )?.responsible?.userProfile;
          const fullName = currentValue
            ? currentValue?.firstname + " " + currentValue?.lastname
            : "-";
          return <Cell style={{ fontWeight: 600 }}>{fullName}</Cell>;
        },
      },
      {
        title: <TableHeading>Registered date</TableHeading>,
        dataIndex: ["user", "created_at"],
        render: (value: any, record: any, index: number) => (
          <Cell style={{ fontWeight: 600 }}>
            {moment(value).format(DATE_FORMAT_SHOW_MMM_YYYY)}
          </Cell>
        ),
      },
      {
        title: <TableHeading>Freshman date</TableHeading>,
        dataIndex: ["user", "freshmanFlow"],
        render: (value: any, record: any, index: number) => {
          const date = record?.freshmanFlow?.created_at;
          return (
            <Cell style={{ fontWeight: 600 }}>
              {moment(date).format(DATE_FORMAT_DD_MMM_YYYY_HH_mm)}
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Label</TableHeading>,
        dataIndex: ["user", "userLabels"],
        render: (value: any, record: any, index: number) => (
          <StudentLabels
            data={record}
            queryKeys={[queryKeys.freshman_list]}
            activeLabels={{ lifecycle: true }}
            tableKey={queryKeys.freshman_list}
            clientUpdate
          />
        ),
      },
    ].filter((e) => !!e);
  }, []);
};
