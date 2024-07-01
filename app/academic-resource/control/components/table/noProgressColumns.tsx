import React from "react";
import {
  AntdUserProfile,
  Cell,
  TableHeading,
  BadgeStarSvg,
  ArrowSvg,
} from "components";
import Image from "next/image";

import { bgColors } from "styles/theme";
import { isDateInMonthAndYear } from "utils/checkThisMonth";

const NoProgressColumns = ({
  expandedRowKeys,
}: {
  expandedRowKeys: (number | string)[];
}) => {
  return [
    {
      dataIndex: "asdasdasd",
      width: "60%",
      title: (
        <TableHeading style={{ padding: "16px 0 16px 66px" }}>
          Teacher
        </TableHeading>
      ),
      render: (value: any, record: any, index: number) => {
        const isHiredDateThisMonth = isDateInMonthAndYear({
          dateString: record?.hired_date,
        });

        return (
          <AntdUserProfile
            disabled
            props={record}
            propsValue={{
              avatar: record.avatar_url,
              ...record,
            }}
            index={index}
            // count={+record?.count ?? 0}
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
      dataIndex: "asdasdasdasd",
      width: "20%",
      title: <TableHeading>Count</TableHeading>,
      render: (value: any, record: any, index: number) => {
        return <Cell>{+record?.count ?? 0}</Cell>;
      },
    },
    {
      dataIndex: "Location",
      width: "20%",
      title: (
        <TableHeading style={{ padding: "16px 0 16px 66px" }}></TableHeading>
      ),
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            <Image
              src="/Location Pin.png"
              alt="Location"
              width={34}
              height={34}
            />
            {record.branch}
          </Cell>
        );
      },
    },
  ];
};

export default NoProgressColumns;
