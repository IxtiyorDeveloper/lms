import React from "react";
import {
  AntdUserProfile,
  Cell,
  TableHeading,
  BadgeStarSvg,
  ArrowSvg,
} from "components";
import { bgColors } from "styles/theme";
import { IArsUserProfile } from "types";
import { isDateInMonthAndYear } from "utils/checkThisMonth";

const HasProgressColumns = ({
  expandedRowKeys,
  mode,
}: {
  expandedRowKeys: (number | string)[];
  mode: string;
}) => {
  return [
    {
      dataIndex: "IAcademicControl",
      width: "60%",
      title: (
        <TableHeading
          style={{ padding: "16px 0 16px 66px", textTransform: "capitalize" }}
        >
          {mode}
        </TableHeading>
      ),
      render: (value: any, record: any, index: number) => {
        const isHiredDateThisMonth = isDateInMonthAndYear({
          dateString: record?.userProfile?.hired_date,
        });

        return (
          <AntdUserProfile
            disabled
            props={record}
            propsValue={{
              avatar: record?.userProfile?.full_avatar,
              fullName: `${record?.userProfile?.firstname} ${record?.userProfile?.lastname}`,
            }}
            index={index}
            // count={record?.average ?? record?.count ?? 0}
            middleRow={
              <div>
                <ArrowSvg
                  width={16}
                  height={16}
                  color={bgColors.yourShadow}
                  style={{
                    transform: `rotate(${
                      expandedRowKeys?.includes(record.id || record.user_id)
                        ? 0
                        : -90
                    }deg)`,
                    transition: "0.3s",
                  }}
                />
              </div>
            }
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
      dataIndex: "group_progress",
      width: "20%",
      title: <TableHeading>Group count</TableHeading>,
      render: (value: any, record: IArsUserProfile, index: number) => {
        return (
          <Cell>
            <div className="table-count">{record.group_count}</div>
          </Cell>
        );
      },
    },
    {
      dataIndex: "group_progress2",
      width: "20%",
      title: <TableHeading>Percent</TableHeading>,
      render: (value: any, record: IArsUserProfile, index: number) => {
        return (
          <Cell>
            <div
              className={`table-progress ${+record.progress < 80 ? "red" : ""}`}
            >
              {record.progress}%
            </div>
          </Cell>
        );
      },
    },
  ];
};

export default HasProgressColumns;
