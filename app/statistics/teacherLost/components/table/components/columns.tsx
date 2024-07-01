import React from "react";
import {
  ArrowSvg,
  AntdUserProfile,
  TableHeading,
  BadgeStarSvg,
} from "components";
import { IFetchTeachers, IRanking } from "types";
import { bgColors } from "styles/theme";
import { LostTypes } from "../index";
import { fixedNumber } from "utils/functions/fixedNumber";
import { isDateInMonthAndYear } from "utils/checkThisMonth";
import { Arrow } from "app/ranking/home/components/table/style";

const Columns = ({
  data,
  expandedRowKeys,
}: {
  data: IFetchTeachers<any> | undefined;
  expandedRowKeys: any;
  minus?: string;
  plus?: string;
  ranking?: IRanking[];
}) => {
  return [
    {
      key: "0",
      title: (
        <TableHeading isId padding>
          Teacher ({data?.teachers?.length})
        </TableHeading>
      ),
      dataIndex: ["user", "userProfile"],
      width: "25%",
      render: (value: any, record: any, index: number) => {
        const isHiredDateThisMonth = isDateInMonthAndYear({
          dateString: record?.hired_date,
        });

        return (
          <AntdUserProfile
            props={record}
            propsValue={value}
            index={index}
            isStudent={false}
            abs={
              isHiredDateThisMonth ? (
                <div className="absn">
                  <BadgeStarSvg />
                  <p className="num_new">New</p>
                </div>
              ) : null
            }
          />
        );
      },
    },
    {
      key: "1",
      width: "15%",
      title: <TableHeading>Group count</TableHeading>,
      dataIndex: "lostGroupCount",
      render: (value: any, record: any) => {
        return record?.data?.group_count || 0;
      },
    },
    {
      key: "2",
      width: "15%",
      title: <TableHeading>Transferring</TableHeading>,
      dataIndex: "lostCountByLeavingCategory",
      render: (value: any, record: any) => {
        return (
          value?.find((e: any) => e.type == LostTypes.transferring)?.count || 0
        );
      },
    },
    {
      key: "3",
      width: "15%",
      title: <TableHeading>Stopping</TableHeading>,
      dataIndex: "lostCountByLeavingCategory",
      render: (value: any, record: any) => {
        return (
          value?.find((e: any) => e.type == LostTypes.stopping)?.count || 0
        );
      },
    },
    {
      key: "4",
      width: "15%",
      title: <TableHeading>Total lost</TableHeading>,
      dataIndex: "lost_count",
      render: (value: any, record: any) => {
        return value;
      },
    },
    {
      key: "10",
      width: "15%",
      title: <TableHeading>Lost norm</TableHeading>,
      dataIndex: "lostGroupCount",
      render: (value: any, record: any) => {
        return record?.data?.norma || 0;
      },
    },
    {
      key: "6",
      width: "15%",
      title: <TableHeading>Lost efficiency</TableHeading>,
      dataIndex: "e",
      render: (value: any, record: any) => {
        return (
          <div style={{ display: "flex" }}>
            <div
              className={`cell ${
                value == 0 ? "zero" : value < 0 ? "minus" : ""
              }`}>
              {fixedNumber(value)}
            </div>
          </div>
        );
      },
    },
    {
      key: "7",
      width: "10%",
      title: <TableHeading></TableHeading>,
      dataIndex: "lost_count",
      render: (value: any, record: any) => {
        const isExpanded = expandedRowKeys?.includes(record?.id);

        return (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}>
            <Arrow isOpen={isExpanded}>
              <ArrowSvg width={12} height={12} color={bgColors.yourShadow} />
            </Arrow>
          </div>
        );
      },
    },
  ];
};

export default Columns;
