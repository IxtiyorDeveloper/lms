import React, { useMemo } from "react";
import { PhoneCell, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import moment from "moment";
import { Popover } from "antd";
import { Flex, stylesByStatus, WrapperT, WrapperText } from "./style";
import { IUserPhone } from "types/userPhone";
import { MainPhone } from "constants/phoneTypes";

const Columns = (data: any, sms: any) => {
  return useMemo(() => {
    return [
      {
        title: <TableHeading style={{ padding: "10px 0" }}>#</TableHeading>,
        dataIndex: "ac",
        width: "2%",
        render: (value: any, record: any, index: number) => {
          const id = getRowNumber({ index });
          return <span>{id}</span>;
        },
      },
      {
        title: <TableHeading>Date</TableHeading>,
        dataIndex: "created_at",
        width: "11%",
        render: (value: any, record: any, index: number) => {
          const dateTime = moment(value).format("HH:mm / DD MMM");
          return <span>{dateTime}</span>;
        },
      },
      {
        title: <TableHeading>Sent by</TableHeading>,
        dataIndex: ["createdBy", "userProfile"],
        width: "15%",
        render: (value: any, record: any, index: number) => {
          const fullName = value?.firstname
            ? `${value?.firstname} ${value?.lastname}`
            : "-";
          return <span>{fullName}</span>;
        },
      },
      {
        title: <TableHeading>Phone number</TableHeading>,
        dataIndex: "phone_number",
        width: "15%",
        render: (value: any, record: any, index: number) => {
          const value_phones: IUserPhone[] = [
            {
              id: 12,
              type: +(record?.phone_type || 0),
              phone_number: value,
              is_confirmed: record?.phone_type == MainPhone ? 1 : 0,
            },
          ];
          return <PhoneCell value={value_phones} />;
        },
      },
      {
        title: <TableHeading>Text</TableHeading>,
        dataIndex: "text",
        width: "45%",
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
  }, [data]);
};

export default Columns;
