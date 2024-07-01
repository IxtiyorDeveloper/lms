import React, { useMemo } from "react";
import { Cell, CircleImage, PhoneCell, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import moment from "moment/moment";
import { ISMSTemplate, IUser } from "types";
import { Flex, stylesByStatus } from "./style";

const Columns = ({
  sms,
}: {
  sms:
    | {
        smsDeliveryStatusEnums: string[];
        smsDeliveryTypeEnums: any;
        templates: ISMSTemplate[];
        smsDeliveryScenarioEnums: { [p: string]: string };
      }
    | undefined;
}) => {
  return useMemo(() => {
    return [
      {
        title: <TableHeading padding>#</TableHeading>,
        dataIndex: "ac",
        width: "2%",
        render: (value: any, record: any, index: number) => {
          const id = getRowNumber({ index });
          return <Cell>{id}</Cell>;
        },
      },
      {
        title: <TableHeading>Date</TableHeading>,
        dataIndex: "created_at",
        width: "10%",
        render: (value: any, record: any, index: number) => {
          return <Cell>{moment(value).format("HH:mm / DD MMM")}</Cell>;
        },
      },
      {
        title: <TableHeading>Name</TableHeading>,
        dataIndex: ["createdBy", "userProfile"],
        width: "10%",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              {value.firstname} {value.lastname}
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Phone number</TableHeading>,
        dataIndex: "phone_number",
        width: "10%",
        render: (value: any, record: any, index: number) => {
          return (
            <PhoneCell
              value={[
                {
                  id: 12,
                  type: 100,
                  phone_number: value,
                  is_confirmed: 1,
                },
              ]}
            />
          );
        },
      },
      {
        title: <TableHeading>Text</TableHeading>,
        dataIndex: "text",
        width: "38%",
        render: (value: any, record: any, index: number) => {
          return <Cell>{value}</Cell>;
        },
      },
      {
        title: <TableHeading>Staff</TableHeading>,
        dataIndex: "createdBy",
        width: "15%",
        render: (value: IUser, record: any, index: number) => {
          return (
            <Cell>
              <Flex>
                <div className="user">
                  <CircleImage src={value.userProfile?.avatar} />
                  {`${value?.userProfile?.firstname} ${value?.userProfile?.lastname}`}
                </div>
              </Flex>
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Delivery status</TableHeading>,
        dataIndex: "status",
        width: "10%",
        render: (value: any, record: any, index: number) => {
          return (
            <Flex>
              <Cell
                style={{
                  ...stylesByStatus[value as keyof typeof stylesByStatus],
                  width: "fit-content",
                }}
              >
                {sms?.smsDeliveryStatusEnums[+value]}
              </Cell>
            </Flex>
          );
        },
      },
    ];
  }, []);
};

export default Columns;
