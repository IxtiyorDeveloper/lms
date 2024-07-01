import React, { useMemo } from "react";
import { Cell, DeleteSvg, EditSvg, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import { OperatorId, Wrapper } from "./style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { ICallTemplates } from "types/callSettings/templates";

const Column = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => [
      {
        title: (
          <TableHeading isId padding>
            Template name
          </TableHeading>
        ),
        dataIndex: "name",
        render: (value: any, record: ICallTemplates, index: number) => {
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
        title: <TableHeading>Type</TableHeading>,
        dataIndex: "url",
        render: (value: any) => {
          return (
            <Cell>
              {value ? (
                <div>
                  <audio controls>
                    <source src={value} type="audio/mpeg" />
                  </audio>
                </div>
              ) : (
                "-"
              )}
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Created date & time</TableHeading>,
        dataIndex: "created_at",
        render: () => {
          return <Cell>29 Feb 2024 11:45</Cell>;
        },
      },
      {
        title: <TableHeading>Action</TableHeading>,
        dataIndex: "id",
        render: (value: any) => {
          return (
            <Wrapper>
              <div
                className="icon"
                onClick={() =>
                  dispatch(
                    toggleModal({
                      key: "templateModal",
                      data: {
                        data: {
                          type: "update",
                          id: value,
                        },
                        open: true,
                      },
                    }),
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
                      key: "deleteTemplate",
                      data: {
                        data: {
                          id: value,
                        },
                        open: true,
                      },
                    }),
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
    [],
  );
};

export default Column;
