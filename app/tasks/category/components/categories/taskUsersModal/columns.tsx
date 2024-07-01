import React from "react";
import { CircleImage, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import { CellNameWrapper } from "app/finance/transactions/components/expense/table/style";
import { ETaskStatus, ITaskAdminUser } from "types";
import TaskStatus from "./taskStatus";
import { WrapStatus } from "./style";

export const Columns = () => {
  return [
    {
      title: (
        <TableHeading style={{ padding: "10px 5px" }}>
          No <span style={{ marginLeft: "10px" }}>Name</span>
        </TableHeading>
      ),
      dataIndex: "receivedBy",
      Footer: "name",
      render: (value: any, record: ITaskAdminUser, index: number) => {
        const id = getRowNumber({ index });
        const full_name = record.user.fullName;

        return (
          <CellNameWrapper
            style={{
              textAlign: "left",
              padding: "10px",
            }}
          >
            <span className="index">{id}</span>
            <CircleImage
              src={record.user.avatar.full_url}
              alt="a"
              height={40}
              width={40}
              className="image"
            />
            <div className="name">{full_name}</div>
          </CellNameWrapper>
        );
      },
    },
    {
      title: <TableHeading>Task by statuses</TableHeading>,
      dataIndex: ["orderedBy", "userProfile"],
      render: (value: any, record: ITaskAdminUser, index: number) => {
        return (
          <WrapStatus>
            <TaskStatus
              statusNumber={Number(Object.keys(record.status)[0])}
              statistic={record.status[ETaskStatus.OPENED]}
            />
            <TaskStatus
              statusNumber={Number(Object.keys(record.status)[1])}
              statistic={record.status[ETaskStatus.DONE]}
            />
            <TaskStatus
              statusNumber={Number(Object.keys(record.status)[2])}
              statistic={record.status[ETaskStatus.CHECKED]}
            />
            <TaskStatus
              statusNumber={Number(Object.keys(record.status)[3])}
              statistic={record.status[ETaskStatus.REJECTED]}
            />
          </WrapStatus>
        );
      },
    },
  ];
};
