import React, { useMemo } from "react";
import {
  Cell,
  DeleteSvg,
  EditSvg,
  ExpenseCreateSvg,
  TableHeading,
} from "components";
import { ActionContainer, ActionContainerItem, ItemColor } from "./style";
import { bgColors } from "styles/theme";

const Columns = ({
  handleOpen,
  handleOpenDeleteModal,
  tableData,
}: {
  handleOpen: any;
  handleOpenDeleteModal: any;
  tableData: any;
}) => {
  return useMemo(() => {
    return [
      {
        accessor: "name",
        Footer: "name",
        Header: <TableHeading padding>Name</TableHeading>,
        Cell: (props: any) => (
          <Cell
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ItemColor color={props.row.original?.color || bgColors.primary} />
            {props.value}
          </Cell>
        ),
      },
      {
        accessor: "open",
        Footer: "id",
        Header: (
          <TableHeading padding style={{ width: "80px" }}>
            Actions
          </TableHeading>
        ),
        Cell: (props: any) => {
          return (
            <ActionContainer>
              {!props.value && (
                <ActionContainerItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen(props.row.original);
                  }}
                >
                  <ExpenseCreateSvg width={15} height={15} />
                </ActionContainerItem>
              )}
              <ActionContainerItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen({ ...props.row.original, type: "update" });
                }}
              >
                <EditSvg width={15} height={15} />
              </ActionContainerItem>
              <ActionContainerItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDeleteModal(props.row.original);
                }}
              >
                <DeleteSvg width={15} height={15} />
              </ActionContainerItem>
            </ActionContainer>
          );
        },
      },
    ];
  }, [tableData]);
};

export default Columns;
