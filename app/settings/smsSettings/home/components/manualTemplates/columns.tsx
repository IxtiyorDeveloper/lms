import { Cell, DeleteSvg, EditSvg, TableHeading } from "components";
import { getRowNumber } from "utils/getRowNumber";
import { Flex } from "./style";
import React, { useMemo } from "react";
import { smsType } from "./index";

const Columns = ({
  handleOpenModal,
  setModals,
  modals,
}: {
  handleOpenModal: any;
  setModals: any;
  modals: any;
}) => {
  return useMemo(() => {
    return [
      {
        title: <TableHeading padding>Title</TableHeading>,
        dataIndex: "title",
        width: "15%",
        render: (value: any, record: any, index: number) => {
          return (
            <Cell>
              <span style={{ marginRight: "8px" }}>{`${getRowNumber({
                index,
              })}`}</span>
              {value}
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Text</TableHeading>,
        dataIndex: "text",
        width: "70%",
        render: (value: any, record: any, index: number) => {
          return <Cell>{value}</Cell>;
        },
      },
      {
        title: <TableHeading>Action</TableHeading>,
        dataIndex: "type",
        width: "15%",
        render: (value: any, record: any, index: number) => {
          return (
            <Flex>
              <EditSvg onClick={() => handleOpenModal(record.id)} />
              {smsType.Dynamic == value && (
                <DeleteSvg
                  width={20}
                  height={20}
                  onClick={() =>
                    setModals({
                      ...modals,
                      deleteAction: {
                        isOpen: true,
                        id: record.id,
                      },
                    })
                  }
                />
              )}
            </Flex>
          );
        },
      },
    ];
  }, []);
};

export default Columns;
