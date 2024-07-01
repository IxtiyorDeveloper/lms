import React, { useMemo } from "react";
import { Cell, DeleteSvg, EditSvg, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import { OperatorId, StatusType, Wrapper } from "./style";
import { OPERATOR_STATUS_ACTIVE } from "constants/operators";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";

const Column = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => [
      {
        title: (
          <TableHeading isId padding>
            Operator
          </TableHeading>
        ),
        dataIndex: "operator_number",
        render: (value: any, record: any, index: number) => {
          const id = getRowNumber({ index });
          return (
            <OperatorId>
              <p className="id">{id}</p>
              <div className="operator-id">{value}</div>
            </OperatorId>
          );
        },
      },
      {
        title: <TableHeading>Staff</TableHeading>,
        dataIndex: "user",
        render: (value: any, record: any, index: number) => {
          const user = value;
          const fullName = user?.userProfile?.firstname
            ? `${user?.userProfile.firstname} ${user?.userProfile?.lastname}`
            : "-";
          return <Cell>{fullName}</Cell>;
        },
      },
      {
        title: <TableHeading>Created at</TableHeading>,
        dataIndex: "created_at",
        render: (value: any, record: any, index: number) => {
          return <Cell>{value}</Cell>;
        },
      },
      {
        title: <TableHeading>Created by</TableHeading>,
        dataIndex: "createdBy",
        render: (value: any, record: any, index: number) => {
          const user = value;
          const fullName = user?.userProfile?.firstname
            ? `${user?.userProfile.firstname} ${user?.userProfile?.lastname}`
            : "-";
          return <Cell>{fullName}</Cell>;
        },
      },
      {
        title: <TableHeading>Status</TableHeading>,
        dataIndex: "status",
        render: (value: any, record: any, index: number) => {
          const is_active = value === OPERATOR_STATUS_ACTIVE;
          return (
            <StatusType is_active={is_active}>
              {is_active ? "Active" : "Inactive"}
            </StatusType>
          );
        },
      },
      {
        title: <TableHeading>Action</TableHeading>,
        dataIndex: "id",
        render: (value: any, record: any, index: number) => {
          return (
            <Wrapper>
              <div
                className="icon"
                onClick={() =>
                  dispatch(
                    toggleModal({
                      key: "operator",
                      data: {
                        data: {
                          type: "update",
                          id: value,
                        },
                        open: true,
                      },
                    })
                  )
                }
              >
                <EditSvg />
              </div>
              <div
                className="icon"
                onClick={() =>
                  dispatch(
                    toggleModal({
                      key: "deleteOperator",
                      data: {
                        data: {
                          id: value,
                        },
                        open: true,
                      },
                    })
                  )
                }
              >
                <DeleteSvg />
              </div>
            </Wrapper>
          );
        },
        Footer: "name",
      },
    ],
    []
  );
};

export default Column;
