import React, { useMemo } from "react";
import { PhoneCell, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import moment from "moment";
import { Flex, WrapSpan } from "./style";
import { IUserPhone } from "types/userPhone";
import { ECallType, ICallStatistics } from "types/statistics/call";

const Columns = () => {
  return useMemo(() => {
    return [
      {
        title: <TableHeading style={{ padding: "10px 0" }}>#</TableHeading>,
        width: "5%",
        dataIndex: "ac",
        render: (value: any, record: any, index: number) => {
          const id = getRowNumber({ index });
          return <span>{id}</span>;
        },
      },
      {
        title: <TableHeading>Date</TableHeading>,
        dataIndex: "created_at",
        width: "10%",
        render: (value: any, record: ICallStatistics, index: number) => {
          const dateTime = moment(value).format("HH:mm / DD MMM");
          return <WrapSpan>{dateTime}</WrapSpan>;
        },
      },
      {
        title: <TableHeading>Client name</TableHeading>,
        dataIndex: ["student", "userProfile"],
        width: "15%",
        render: (value: any, record: ICallStatistics, index: number) => {
          const fullName = record?.student?.user?.userProfile?.firstname
            ? record?.student?.user?.userProfile?.firstname ||
              "" + record?.student?.user?.userProfile?.lastname ||
              ""
            : "-";
          return <WrapSpan>{fullName}</WrapSpan>;
        },
      },
      {
        title: <TableHeading>Phone number</TableHeading>,
        dataIndex: "phone_number",
        width: "15%",
        render: (value: any, record: ICallStatistics, index: number) => {
          const phone =
            record?.direction == ECallType.inbound
              ? record?.caller
              : record?.callee;

          const phone_value: IUserPhone[] = [
            {
              id: 1,
              is_confirmed: 1,
              phone_number: `998${phone}`,
              type: 100,
            },
          ];

          return (
            <div>
              {phone?.toString()?.length == 9 ? (
                <PhoneCell value={phone_value} />
              ) : (
                phone
              )}
            </div>
          );
        },
      },
      {
        title: <TableHeading>Call recording</TableHeading>,
        dataIndex: "text",
        width: "40%",
        render: (value: any, record: ICallStatistics, index: number) => {
          const recordLink = record?.record;
          return (
            <WrapSpan>
              {recordLink ? (
                <div>
                  <audio controls>
                    <source src={recordLink} type="audio/mpeg" />
                  </audio>
                </div>
              ) : (
                "-"
              )}
            </WrapSpan>
          );
        },
      },
      {
        title: <TableHeading>Staff name</TableHeading>,
        dataIndex: "status",
        width: "15%",
        render: (value: any, record: ICallStatistics, index: number) => {
          const operator = record?.operator;
          return <Flex>{operator}</Flex>;
        },
      },
    ];
  }, []);
};

export default Columns;
