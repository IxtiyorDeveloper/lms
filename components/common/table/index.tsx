import React, {
  CSSProperties,
  ReactNode,
  memo,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { Table, TableContainer } from "@mui/material";
import { StyledFooter, StyledTable } from "./style";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import {
  useTable,
  useExpanded,
  useFilters,
  useGlobalFilter,
  useRowSelect,
  TableState,
  Cell,
} from "react-table";
import { opacityRows } from "constants/studentRowColor";
import TableSkeleton from "./skeleton";
import { Empty } from "antd";
import { useRouter } from "next/router";
import { TParams } from "types";
import { MyPagination } from "components";

const StyledTableCell = styled(TableCell)(() => ({
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
  ({ color, opacity }: { color: string; opacity: string }) => ({
    position: "relative",
    opacity: opacity,
    "&:nth-of-type(odd)": {
      backgroundColor: color || bgColors.white,
    },
    "&:nth-of-type(even)": {
      backgroundColor: color || bgColors.white,
    },
  })
);

interface IBasicTable {
  columns: any[];
  data?: any[];
  bgRowCell?: string;
  styles?: React.CSSProperties;
  headBorder?: boolean;
  isSticky?: boolean;
  stickyIndexOfColumn?: number;
  border?: any;
  paddingRow?: number;
  marginRow?: number;
  bottomBorderColor?: string;
  tableRowColor?: string;
  divideTableNumber?: number;
  headerRowStyle?: React.CSSProperties;
  hasPagination?: boolean;
  pageCount?: number;
  currentPage?: number;
  alignment?: boolean;
  isHeaderVisible?: boolean;
  divideRowNumber?: number;
  divideRowNumbers?: number[];
  isWatchPage?: boolean;
  isLoading?: boolean;
  rowColors?: { [key: number]: string };
  tdStyles?: CSSProperties;
  isEmptyWithHeader?: boolean;
  theadRowStyle?: CSSProperties;
  theadStyle?: CSSProperties;
  tableContainerStyles?: CSSProperties;
  subComponent?: {
    isExpandable?: boolean;
    renderRowSubComponent?: any;
    rowClick?: boolean;
  };
  isExpandedRowColor?: string;
  hasFooter?: boolean;
  footerColor?: string;
  columnWidths?: ReactNode;
  withStickyComponent?: boolean;
  hasOpacity?: boolean;
  borderHeight?: number;
  numberedRowColors?: { id: number; color: string }[];
  bordered?: boolean;
  total?: number;
  canFilter?: boolean;
  handleRowClick?: ({ row }: any) => void;
  initialState?: Partial<TableState<object>> | undefined;
  funcTDStyles?: (cell: Cell<object>) => CSSProperties;
  defaultPageSize?: number;
  tableProps?: TParams;
}

export interface IRefTable {
  loadingRowIndex: (index: number | null) => void;
}

const BasicTable = forwardRef((props: IBasicTable, ref) => {
  const {
    columns,
    data = [],
    alignment,
    bgRowCell,
    headBorder,
    styles,
    isHeaderVisible = true,
    border,
    paddingRow,
    marginRow,
    bottomBorderColor,
    tableRowColor,
    divideTableNumber,
    hasPagination = false,
    pageCount = 10,
    currentPage,
    rowColors,
    divideRowNumber,
    divideRowNumbers,
    isLoading,
    tdStyles,
    isEmptyWithHeader = false,
    subComponent,
    theadStyle,
    theadRowStyle,
    isExpandedRowColor = undefined,
    hasFooter = false,
    footerColor,
    columnWidths,
    withStickyComponent = false,
    tableContainerStyles,
    hasOpacity = false,
    borderHeight = 4,
    numberedRowColors,
    bordered = true,
    total,
    canFilter,
    handleRowClick,
    initialState = undefined,
    funcTDStyles = null,
    defaultPageSize = 20,
    tableProps,
  } = props;
  const router = useRouter();
  const pageSize = router.query.pageSize?.toString() || defaultPageSize || 20;
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      width: "20px",
      Filter: null,
    }),
    []
  );
  const pluginComponents = {
    expand: [useFilters, useGlobalFilter, useExpanded],
    filter: [useFilters, useGlobalFilter],
  };
  const plugins = subComponent?.isExpandable
    ? pluginComponents.expand
    : canFilter
    ? pluginComponents.filter
    : [];
  const {
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    visibleColumns,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState,
      defaultColumn,
      ...tableProps,
    },
    ...plugins,
    useRowSelect
  );
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
  }, [router.query?.pageSize]);

  const [indexLoading, setIndexLoading] = useState<number | null>(null);

  useImperativeHandle(ref, (): IRefTable => {
    return {
      loadingRowIndex: (index: number | null) => {
        setIndexLoading(index);
      },
    };
  });

  const refRow = useRef<any>(null);

  return (
    <StyledTable
      divideTableNumber={divideTableNumber}
      divideRowNumber={divideRowNumber}
      divideRowNumbers={divideRowNumbers}
      numberedRowColors={numberedRowColors}
      bordered={bordered}
    >
      {isLoading ? (
        <TableSkeleton />
      ) : !!data?.length || isEmptyWithHeader ? (
        <TableContainer
          style={tableContainerStyles}
          className="table-container"
        >
          <Table
            id="table"
            aria-label="customized table"
            sx={{
              [`& .${tableCellClasses.root}`]: {
                borderBottom: `${borderHeight}px solid ${
                  bottomBorderColor || bgColors.hat
                }`,
                border: headBorder ? border : null,
                paddingY: `${paddingRow}px` || "10px",
                margin: 0,
                // marginBottom: `${marginRow}px` || "10px",
                ...styles,
              },
            }}
          >
            {columnWidths}

            {isHeaderVisible && (
              <TableHead>
                {headerGroups.map((headerGroup, headerGroupsIndex) => (
                  <TableRow style={theadRowStyle} key={headerGroupsIndex}>
                    {headerGroup.headers.map((column) => {
                      return (
                        <StyledTableCell
                          style={{
                            borderBottom: border,
                            ...theadStyle,
                          }}
                          {...column.getHeaderProps({})}
                        >
                          {column.render("Header")}
                          <div>
                            {
                              // @ts-ignore
                              !!column?.canFilter && !!column?.Filter
                                ? column?.render?.("Filter")
                                : null
                            }
                          </div>
                        </StyledTableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHead>
            )}
            {!!data?.length || !isEmptyWithHeader ? (
              <>
                <TableBody ref={refRow} {...getTableBodyProps()}>
                  {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    // @ts-ignore
                    const status = row?.original?.status;
                    const expandProps =
                      subComponent?.isExpandable && subComponent.rowClick
                        ? // @ts-ignore
                          row?.getToggleRowExpandedProps()
                        : {};
                    const isLoadingRow = indexLoading === rowIndex;
                    return (
                      <React.Fragment key={`${rowIndex}_key`}>
                        <StyledTableRow
                          onClick={() => {
                            if (handleRowClick) {
                              handleRowClick({
                                row: row,
                              });
                              // @ts-ignore
                              row.toggleRowSelected();
                            }
                          }}
                          color={
                            isLoadingRow
                              ? "rgba(0, 0, 0, 0.3)"
                              : !!isExpandedRowColor
                              ? // @ts-ignore
                                !(row?.isExpanded as boolean)
                                ? tableRowColor
                                : isExpandedRowColor
                              : tableRowColor || rowColors?.[status]
                          }
                          opacity={
                            isLoadingRow
                              ? 0.3
                              : hasOpacity
                              ? opacityRows[status as keyof typeof opacityRows]
                              : 1
                          }
                          {...row.getRowProps()}
                          key={rowIndex}
                          {...expandProps}
                          sx={{
                            position: withStickyComponent
                              ? "unset"
                              : "relative",
                          }}
                          style={{
                            pointerEvents: isLoadingRow ? "none" : "unset",
                          }}
                        >
                          {row.cells.map((cell: any, cellIndex) => {
                            return (
                              <StyledTableCell
                                style={{
                                  ...tdStyles,
                                  ...funcTDStyles?.(cell),
                                  backgroundColor: bgRowCell,
                                  border: border,
                                  textAlign:
                                    alignment && cellIndex !== 0
                                      ? "center"
                                      : "unset",
                                }}
                                {...cell.getCellProps({})}
                                key={cellIndex}
                                rowSpan={cell?.column?.rowSpan}
                                colSpan={cell?.column?.colSpan}
                              >
                                {cell.render("Cell")}
                              </StyledTableCell>
                            );
                          })}
                        </StyledTableRow>
                        {
                          //@ts-ignore
                          row.isExpanded && subComponent?.isExpandable ? (
                            <tr>
                              <td colSpan={visibleColumns.length}>
                                {subComponent.renderRowSubComponent({
                                  row,
                                })}
                              </td>
                            </tr>
                          ) : null
                        }
                      </React.Fragment>
                    );
                  })}
                </TableBody>
                {hasFooter && (
                  <StyledFooter color={footerColor ?? bgColors.white}>
                    {footerGroups.map((group, index) => (
                      <tr {...group.getFooterGroupProps()} key={index}>
                        {group.headers.map((column, childIndex) => (
                          <td {...column.getFooterProps()} key={childIndex}>
                            {column.render("Footer", { column })}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </StyledFooter>
                )}
              </>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Empty style={{ paddingBottom: "40px" }} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      ) : (
        <Empty style={{ paddingBottom: "40px" }} />
      )}
      {hasPagination && isHeaderVisible && (
        <MyPagination
          current={currentPage}
          total={total}
          pageCount={pageCount}
          pageSize={+pageSize}
        />
      )}
    </StyledTable>
  );
});

export default memo(BasicTable);
