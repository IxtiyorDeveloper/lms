import React, { Fragment, ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTable } from "react-table";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { bgColors, fontSizes, textColors } from "styles/theme";
import TableRow from "@mui/material/TableRow";
import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import { CollapseC, StyledTable } from "./style";
import TableSkeleton from "../table/skeleton";
import { Collapse, Empty } from "antd";
import { DragSvg } from "../../elements";
import { useRouter } from "next/router";
import { MyPagination } from "components";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: bgColors.white,
    color: textColors.yourShadow,
    letterSpacing: "-0.01em",
    fontWeight: 600,
    fontSize: fontSizes.f12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  root: {
    borderBottom: "none",
  },
}));

const StyledTableRow = styled(TableRow)(
  ({ color, isDragging }: { color?: any; isDragging?: any }) => ({
    position: "relative",
    "&:nth-of-type(odd)": {
      backgroundColor: color || bgColors.white,
    },
    "&:nth-of-type(even)": {
      backgroundColor: color || bgColors.white,
    },
    "&:last-child td, &:last-child th": {
      backgroundColor: color || bgColors.white,
    },
    display: isDragging ? "table" : "",
    width: "100%",
  })
);

const { Panel } = Collapse;

const Custom = ({
  row,
  provided,
  snapshot,
  index,
  alignment,
  bgRowCell,
  border,
  collapseContainerKeyName,
}: any) => {
  const [index1, setIndex1] = useState(null);
  return (
    <Fragment>
      <StyledTableRow
        {...row.getRowProps()}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        onClick={(e) => {
          e.stopPropagation();
          setIndex1(!index1 ? index : null);
        }}
      >
        {row.cells.map(
          (
            cell: {
              getCellProps: () => JSX.IntrinsicAttributes &
                React.ClassAttributes<HTMLTableDataCellElement> &
                React.TdHTMLAttributes<HTMLTableDataCellElement>;
              render: (
                arg0: string,
                arg1: {
                  dragHandleProps:
                    | DraggableProvidedDragHandleProps
                    | null
                    | undefined;
                  isSomethingDragging: any;
                }
              ) =>
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            },
            cellIndex: number
          ) => (
            // @ts-ignore
            <StyledTableCell
              {...cell.getCellProps()}
              style={
                alignment && cellIndex !== 0
                  ? {
                      backgroundColor: bgRowCell,
                      border: border,
                      textAlign: "center",
                    }
                  : {
                      backgroundColor: bgRowCell,
                      border: border,
                    }
              }
            >
              {cell.render("Cell", {
                dragHandleProps: provided.dragHandleProps,
                isSomethingDragging:
                  // @ts-ignore
                  snapshot.isDraggingOver,
              })}
            </StyledTableCell>
          )
        )}
      </StyledTableRow>

      {index1 && !snapshot.isDragging && (
        <StyledTableCell
          style={{ backgroundColor: bgColors.wildSand, padding: 0 }}
          colSpan={2}
        >
          <CollapseC
            bordered={false}
            style={{
              width: "100%",
              flex: 1,
              border: "0 !important",
              padding: 0,
            }}
            activeKey={index1 || []}
          >
            <Panel
              style={{ border: "0 !important", padding: 0 }}
              key={index}
              header={<div style={{ border: "0 solid red" }}></div>}
            >
              {collapseContainerKeyName &&
                row.original[collapseContainerKeyName]}
            </Panel>
          </CollapseC>
        </StyledTableCell>
      )}
    </Fragment>
  );
};

function TableComponent({
  columns,
  data,
  updateMyData,
  reorderData,
  alignment,
  bgRowCell,
  headBorder,
  styles,
  isSticky,
  stickyIndexOfColumn = 0,
  border,
  paddingRow,
  bottomBorderColor,
  divideTableNumber,
  hasPagination = false,
  pageCount = 10,
  currentPage = 1,
  divideRowNumber,
  isLoading,
  disabled,
  isCollapsable,
  columnWidths,
  collapseContainerKeyName,
  total,
}: IBasicTable) {
  const router = useRouter();
  const pageSize = router.query?.pageSize?.toString() || 20;

  const { getTableProps, headerGroups, prepareRow, rows, getTableBodyProps } =
    useTable({
      columns,
      data,
      // non-API instance pass-throughs
      // @ts-ignore
      updateMyData,
      reorderData,
    });

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    reorderData(source.index, destination.index);
  };
  useEffect(() => {
    if (
      currentPage?.toString() === pageCount?.toString() &&
      +(router?.query?.page || 0) > +(pageCount || 0)
    ) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, page: pageCount },
        },
        undefined,
        { scroll: false }
      );
    }
  }, [currentPage, router?.query?.page, pageCount]);

  useEffect(() => {
    if (+(router.query?.pageSize || 0) > 100) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, pageSize: 100 },
        },
        undefined,
        { scroll: false }
      );
    }
  }, [router?.query?.pageSize]);

  return (
    <StyledTable
      divideTableNumber={divideTableNumber}
      divideRowNumber={divideRowNumber}
    >
      {isLoading ? (
        <TableSkeleton />
      ) : !!data?.length ? (
        <TableContainer>
          <Table
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: `4px solid ${bottomBorderColor || bgColors.hat}`,
                border: headBorder ? border : null,
                paddingY: `${paddingRow}px` || "10px",
                margin: 0,
                ...styles,
              },
            }}
            {...getTableProps()}
          >
            {columnWidths}
            <TableHead>
              {headerGroups.map((headerGroup, headerIndex) => (
                <StyledTableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <StyledTableCell
                      style={{ borderBottom: border }}
                      sx={
                        isSticky && headerIndex === stickyIndexOfColumn
                          ? { position: "sticky", left: 0 }
                          : {}
                      }
                      {...column.getHeaderProps({})}
                    >
                      {column.render("Header")}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableHead>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="table-body">
                {(provided, snapshot) => (
                  <TableBody
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {rows.map((row: any, i) => {
                      prepareRow(row);
                      const index = row.original.id || i;
                      return isCollapsable ? (
                        <Draggable
                          draggableId={index.toString()}
                          key={index}
                          index={row.index}
                          isDragDisabled={disabled}
                        >
                          {(provided, snapshot) => {
                            return (
                              <Custom
                                row={row}
                                provided={provided}
                                snapshot={snapshot}
                                index={index}
                                alignment={alignment}
                                bgRowCell={bgRowCell}
                                border={border}
                                collapseContainerKeyName={
                                  collapseContainerKeyName
                                }
                              />
                            );
                          }}
                        </Draggable>
                      ) : (
                        <Draggable
                          draggableId={index.toString()}
                          key={index}
                          index={row.index}
                          isDragDisabled={disabled}
                        >
                          {(provided, snapshot) => {
                            return (
                              <StyledTableRow
                                {...row.getRowProps()}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                isDragging={snapshot.isDragging}
                              >
                                {row.cells.map(
                                  (
                                    cell: {
                                      getCellProps: () => JSX.IntrinsicAttributes &
                                        React.ClassAttributes<HTMLTableDataCellElement> &
                                        React.TdHTMLAttributes<HTMLTableDataCellElement>;
                                      render: (
                                        arg0: string,
                                        arg1: {
                                          dragHandleProps:
                                            | DraggableProvidedDragHandleProps
                                            | null
                                            | undefined;
                                          isSomethingDragging: any;
                                        }
                                      ) =>
                                        | string
                                        | number
                                        | boolean
                                        | React.ReactElement<
                                            any,
                                            | string
                                            | React.JSXElementConstructor<any>
                                          >
                                        | React.ReactFragment
                                        | React.ReactPortal
                                        | null
                                        | undefined;
                                    },
                                    cellIndex: number
                                  ) => (
                                    // @ts-ignore
                                    <StyledTableCell
                                      {...cell.getCellProps()}
                                      style={
                                        alignment && cellIndex !== 0
                                          ? {
                                              backgroundColor: bgRowCell,
                                              border: border,
                                              textAlign: "center",
                                            }
                                          : {
                                              backgroundColor: bgRowCell,
                                              border: border,
                                            }
                                      }
                                    >
                                      {cellIndex === 0 ? (
                                        <div
                                          className={`cell ${
                                            !disabled ? "active" : ""
                                          }`}
                                        >
                                          <DragSvg />
                                          {cell.render("Cell", {
                                            dragHandleProps:
                                              provided.dragHandleProps,
                                            isSomethingDragging:
                                              // @ts-ignore
                                              snapshot.isDraggingOver,
                                          })}
                                        </div>
                                      ) : (
                                        cell.render("Cell", {
                                          dragHandleProps:
                                            provided.dragHandleProps,
                                          isSomethingDragging:
                                            // @ts-ignore
                                            snapshot.isDraggingOver,
                                        })
                                      )}
                                    </StyledTableCell>
                                  )
                                )}
                              </StyledTableRow>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </DragDropContext>
          </Table>
        </TableContainer>
      ) : (
        <Empty style={{ paddingBottom: "40px" }} />
      )}
      {hasPagination && (
        <MyPagination
          current={currentPage}
          total={total}
          pageCount={pageCount}
          pageSize={+pageSize}
        />
      )}
    </StyledTable>
  );
}

interface IBasicTable {
  columns: any[];
  data: any[];
  setData?: any;
  bgRowCell?: string;
  styles?: React.CSSProperties;
  headBorder?: boolean;
  isSticky?: boolean;
  stickyIndexOfColumn?: number;
  border?: any;
  paddingRow?: number;
  bottomBorderColor?: string;
  tableRowColor?: string;
  divideTableNumber?: number;
  headerRowStyle?: React.CSSProperties;
  hasPagination?: boolean;
  pageCount?: number;
  currentPage?: number;
  alignment?: boolean;
  divideRowNumber?: number;
  isWatchPage?: boolean;
  isLoading?: boolean;
  rowColors?: { [key: number]: string };
  updateMyData?: any;
  reorderData?: any;
  handleReorder?: (data: any) => void;
  disabled?: boolean;
  isCollapsable?: boolean;
  isOpenKeyName?: string;
  columnWidths?: ReactNode;
  onClickCollapse?: (index: number) => void;
  collapseContainerKeyName?: string;
  total?: number;
}

function DraggableTable({
  columns,
  data,
  alignment,
  bgRowCell,
  headBorder,
  styles,
  isSticky,
  stickyIndexOfColumn = 0,
  border,
  paddingRow,
  bottomBorderColor,
  tableRowColor,
  divideTableNumber,
  headerRowStyle,
  hasPagination = false,
  pageCount = 10,
  currentPage = 1,
  rowColors,
  divideRowNumber,
  isLoading,
  isWatchPage,
  setData,
  handleReorder,
  disabled = false,
  isCollapsable = false,
  columnWidths,
  isOpenKeyName = "",
  onClickCollapse = () => {},
  collapseContainerKeyName = "",
}: IBasicTable) {
  const updateMyData = (rowIndex: any, columnID: any, newValue: any) => {
    setData((oldData: any[]) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...oldData[rowIndex],
            [columnID]: newValue,
          };
        }
        return row;
      })
    );
  };
  const reorderData = (startIndex: any, endIndex: any) => {
    const newData = [...data];
    const [movedRow] = newData.splice(startIndex, 1);
    newData.splice(endIndex, 0, movedRow);
    setData(newData);
    handleReorder?.(newData);
  };

  return (
    <div>
      <TableComponent
        columns={columns}
        columnWidths={columnWidths}
        data={data}
        updateMyData={updateMyData}
        reorderData={reorderData}
        border={border}
        alignment={alignment}
        bgRowCell={bgRowCell}
        headBorder={headBorder}
        styles={styles}
        isSticky={isSticky}
        stickyIndexOfColumn={stickyIndexOfColumn}
        paddingRow={paddingRow}
        bottomBorderColor={bottomBorderColor}
        tableRowColor={tableRowColor}
        divideTableNumber={divideTableNumber}
        headerRowStyle={headerRowStyle}
        hasPagination={hasPagination}
        pageCount={pageCount}
        currentPage={currentPage}
        rowColors={rowColors}
        divideRowNumber={divideRowNumber}
        isLoading={isLoading}
        isWatchPage={isWatchPage}
        disabled={disabled}
        isCollapsable={isCollapsable}
        isOpenKeyName={isOpenKeyName}
        onClickCollapse={onClickCollapse}
        collapseContainerKeyName={collapseContainerKeyName}
      />
    </div>
  );
}

export default DraggableTable;
