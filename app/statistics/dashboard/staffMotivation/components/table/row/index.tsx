import React from "react";
import { Cell, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

export const row = () => {
  return [
    {
      title: (
        <TableHeading className="header_staff" padding>
          <div>#</div> <div>Staff</div>
        </TableHeading>
      ),
      dataIndex: "received_by",
      width: "25%",
      render: (value: any, record: any, index: number) => {
        return (
          <Cell>
            <div className="header_staff">
              <div>{getRowNumber({ index })}</div>
              <div className="ml">{value}</div>
            </div>
          </Cell>
        );
      },
    },
    {
      title: <TableHeading>Description</TableHeading>,
      dataIndex: "description",
      width: "40%",
      render: (value: any, record: any, index: number) => {
        return <Cell>{value}</Cell>;
      },
    },
    {
      title: <TableHeading>Ordered by</TableHeading>,
      dataIndex: "ordered_by",
      width: "20%",
      render: (value: any, record: any, index: number) => {
        return <Cell>{value}</Cell>;
      },
    },
    {
      title: <TableHeading>Amount</TableHeading>,
      dataIndex: "amount",
      width: "30%",
      render: (value: any, record: any, index: number) => {
        return <Cell>{toCurrencyFormat(value)}</Cell>;
      },
    },
  ];
};
