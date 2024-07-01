import React, { useMemo } from "react";
import { PhoneCell, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import moment from "moment";
import { Popover } from "antd";
import {
  Flex,
  stylesByStatus,
  WrapperT,
  WrapperText,
  WrapSpan,
} from "../manualSms/style";
import { IUserPhone } from "types/userPhone";
import { MainPhone } from "constants/phoneTypes";
import { usePageDataMemo } from "../../../../../../../hooks";

const Columns = (sms: any) => {
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
        render: (value: any) => {
          const dateTime = moment(value).format("HH:mm / DD MMM");
          return <WrapSpan>{dateTime}</WrapSpan>;
        },
      },
      {
        title: <TableHeading>Receiver</TableHeading>,
        dataIndex: ["userPhone", "user", "userProfile"],
        width: "15%",
        render: (value: any, record: any, index: number) => {
          const fullName = value
            ? `${value?.firstname} ${value?.lastname}`
            : "-";
          return <WrapSpan>{fullName}</WrapSpan>;
        },
      },
      {
        title: <TableHeading>Phone number</TableHeading>,
        dataIndex: "phone_number",
        width: "15%",
        render: (value: any, record: any) => {
          const phone_value: IUserPhone[] = [
            {
              id: 12,
              type: +(record?.phone_type || 0),
              phone_number: value,
              is_confirmed: record?.phone_type == MainPhone ? 1 : 0,
            },
          ];
          return <PhoneCell value={phone_value} />;
        },
      },
      {
        title: <TableHeading>SMS Service</TableHeading>,
        dataIndex: "text",
        width: 130,
        render: (value: any, record: any, index: number) => {
          return <p>{record?.service?.name}</p>;
        },
      },
      {
        title: <TableHeading>Text</TableHeading>,
        dataIndex: "text",
        width: 200,
        render: (value: any, record: any, index: number) => {
          const content = <WrapperT>{value}</WrapperT>;
          return (
            <Popover destroyTooltipOnHide content={content}>
              <WrapperText>{value}</WrapperText>
            </Popover>
          );
        },
      },
      {
        title: <TableHeading>Delivery status</TableHeading>,
        dataIndex: "status",
        width: "15%",
        render: (value: any, record: any, index: number) => {
          const style = stylesByStatus[value as keyof typeof stylesByStatus];
          const smsStatus = sms?.smsDeliveryStatusEnums[+value];
          return (
            <Flex>
              <div style={style}>{smsStatus}</div>
            </Flex>
          );
        },
      },
    ];
  }, [sms]);
};

export default Columns;
