import React from "react";
import { Comment, Wrapper } from "./style";
import { CircleImage, AntdTable, Cell, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import { useRouter } from "next/router";
import { ColumnGroupType, ColumnType } from "antd/lib/table/interface";
import { usePageData } from "hooks";
import { FillStarSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { Tooltip } from "antd";
import Link from "next/link";

interface IProps {
  row: any;
}

const ChildTable = ({ row: { original } }: IProps) => {
  const router = useRouter();
  const { data } = usePageData();

  return (
    <Wrapper>
      <AntdTable
        columns={(
          [
            {
              title: <TableHeading padding>№</TableHeading>,
              render: (value, record, index) => {
                return (
                  <Cell className="title" style={{ padding: "20px" }}>
                    {getRowNumber({ index })}
                  </Cell>
                );
              },
            },
            router.query.tabId != "200" && {
              title: <TableHeading>Staff</TableHeading>,
              width: "50%",
              render: (value, record: any, index) => {
                return (
                  <Cell
                    className="title"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <CircleImage src={record?.user?.userProfile?.avatar} />
                    <Link
                      href={`/settings/staff-settings/edit-member/${record?.user_id}`}
                    >
                      {record?.user?.userProfile?.fullName}
                    </Link>
                  </Cell>
                );
              },
            },
            {
              title: <TableHeading>Role</TableHeading>,
              width: "20%",
              render: (value, record, index) => {
                return (
                  <Cell className="title">
                    {record?.role_id
                      ? data?.roles?.find((e) => e.id == record?.role_id)?.name
                      : record?.role_name}
                  </Cell>
                );
              },
            },
            router.query.tabId != "200" && {
              title: <TableHeading>Department</TableHeading>,
              render: (value, record, index) => {
                return (
                  <Cell className="title">
                    {record?.department_id &&
                      data?.departments?.find(
                        (e) => e.id == record?.department_id,
                      )?.name}
                  </Cell>
                );
              },
            },
            {
              title: <TableHeading>Rate</TableHeading>,
              render: (value, record, index) => {
                return (
                  <Cell
                    className="title"
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <p>{record?.rate}</p>
                    <FillStarSvg
                      color={bgColors.primary}
                      width={20}
                      height={20}
                    />
                  </Cell>
                );
              },
            },
            {
              title: <TableHeading>Comment</TableHeading>,
              width: "10%",
              render: (value, record, index) => {
                return (
                  <Cell style={{ padding: "6px" }}>
                    <Tooltip
                      title={
                        <div
                          dangerouslySetInnerHTML={{ __html: record?.comment }}
                        />
                      }
                      destroyTooltipOnHide
                    >
                      <Comment
                        dangerouslySetInnerHTML={{ __html: record?.comment }}
                      />
                    </Tooltip>
                  </Cell>
                );
              },
            },
          ] as (ColumnGroupType<any> | ColumnType<any> | boolean)[]
        ).filter((e) => !!e)}
        dataSource={original.reviews || []}
      />
    </Wrapper>
  );
};

export default ChildTable;
