import React, { useMemo } from "react";
import { Cell, TableHeading } from "components";
import { Flex } from "./style";
import moment from "moment";
import { textColors } from "styles/theme";
import { DATE_FORMAT_DD_MM_YYYY, DATE_FORMAT_HH_mm } from "constants/dates";
import { usePageDataMemo } from "hooks";
import { generateCallType } from "./utils/generateCallType";
import formatPhoneNumber from "utils/phoneNumberFormatter";

const CallColumns = () => {
  const selects = usePageDataMemo();
  return useMemo(() => {
    return [
      {
        title: <TableHeading padding>Date</TableHeading>,
        dataIndex: "created_at",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <Flex>
                <p> {moment(value).format(DATE_FORMAT_DD_MM_YYYY)}</p>
                <p className="hour">
                  {moment(value).format(DATE_FORMAT_HH_mm)}
                </p>
              </Flex>
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Type</TableHeading>,
        dataIndex: "amount",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <Flex
                style={{
                  color: value > 0 ? textColors.midori : textColors.pop,
                }}>
                {generateCallType({ record: record })}
              </Flex>
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Phone number</TableHeading>,
        dataIndex: "amount",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>{formatPhoneNumber(record?.callee?.toString() ?? "0")}</Cell>
          );
        },
      },
      {
        title: <TableHeading>Staff</TableHeading>,
        dataIndex: ["created_by", "operator"],
        render: (value: any, record: any) => {
          return (
            <Cell>
              <Flex>
                <p> {record?.createdBy?.username || record?.operator}</p>
                {record?.createdBy?.rbacAssignment?.rbacRole?.name ? (
                  <p className="hour">
                    {record?.createdBy?.rbacAssignment?.rbacRole?.name}
                  </p>
                ) : null}
              </Flex>
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Call detail</TableHeading>,
        dataIndex: "full_name",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <audio controls src={record?.record}></audio>
            </Cell>
          );
        },
      },
    ];
  }, [selects]);
};

export default CallColumns;
