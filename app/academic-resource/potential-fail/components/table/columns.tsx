import React from "react";
import { AntdUserProfile, Cell, TableHeading, ArrowSvg } from "components";
import Image from "next/image";
import { bgColors } from "styles/theme";
import { isDateInMonthAndYear } from "utils/checkThisMonth";
import { useRouter } from "next/router";
import { TYPE_TEACHER } from "constants/teacher";
import { Tooltip } from "antd";
import { Wrapper } from "./style";

const Columns = ({
  expandedRowKeys,
}: {
  expandedRowKeys: (number | string)[];
}) => {
  const router = useRouter();
  const mentorType = router.query.mentor_type || TYPE_TEACHER;

  return [
    {
      dataIndex: [],
      width: "60%",
      title: (
        <TableHeading style={{ padding: "16px 0 16px 66px" }}>
          {mentorType == TYPE_TEACHER ? "Teacher" : "Support"}
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
          />
        );
      },
    },
    {
      dataIndex: [],
      width: "20%",
      title: <TableHeading>Count</TableHeading>,
      render: (value: any, record: any, index: number) => {
        return <Cell>{+record?.count ?? 0}</Cell>;
      },
    },
    {
      dataIndex: [],
      width: "20%",
      title: (
        <TableHeading style={{ padding: "16px 0 16px 66px" }}></TableHeading>
      ),
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            <Tooltip destroyTooltipOnHide title={record.branch}>
              <Wrapper>
                <Image
                  src="/Location Pin.png"
                  alt="Location"
                  width={34}
                  height={34}
                />
                <div className="branch">{record.branch}</div>
              </Wrapper>
            </Tooltip>
          </Cell>
        );
      },
    },
  ];
};

export default Columns;
