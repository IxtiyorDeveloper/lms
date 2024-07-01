import React, { FC } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { Table, TableContainer } from "@mui/material";
import { StyledTable } from "./style";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import { useTable } from "react-table";
import { TimePicker } from "components";
import { DATE_FORMAT_HH_mm } from "constants/dates";

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

const StyledTableRow = styled(TableRow)(({ theme, color }) => ({
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
}));

interface IBasicTable {
  columns: any[];
  data: any[];
  styles?: React.CSSProperties;
  isSticky?: boolean;
  stickyIndexOfColumn?: number;
  border?: any;
  tableRowColor?: string;
  divideTableNumber?: number;
  control: any;
  watch: any;
  errors: any;
  getValues?: any;
}

const BasicTable: FC<IBasicTable> = ({
  columns,
  data,
  styles,
  isSticky,
  stickyIndexOfColumn = 0,
  border,
  tableRowColor,
  divideTableNumber,
  control,
  watch,
  errors,
  getValues,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });
  return (
    <StyledTable divideTableNumber={divideTableNumber}>
      <TableContainer>
        <Table
          aria-label="customized table"
          sx={{
            [`& .${tableCellClasses.root}`]: {
              border: border || null,
              ...styles,
            },
          }}
        >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow>
                {headerGroup.headers.map((column, index) => (
                  <StyledTableCell
                    sx={
                      isSticky && index === stickyIndexOfColumn
                        ? { position: "sticky", left: 0 }
                        : {}
                    }
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </StyledTableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <StyledTableRow
                  color={tableRowColor}
                  {...row.getRowProps()}
                  key={index}
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <StyledTableCell
                        {...cell.getCellProps()}
                        sx={
                          isSticky && index === stickyIndexOfColumn
                            ? {
                                position: "sticky",
                                left: 0,
                              }
                            : {}
                        }
                        key={index}
                      >
                        {cell?.column?.id === "to" ||
                        cell?.column?.id === "from" ? (
                          <TimePicker
                            defaultValue={
                              getValues(
                                `picker${cell?.column?.id}${cell?.row?.id}`
                              ) || ""
                            }
                            name={`picker${cell?.column?.id}${cell?.row?.id}`}
                            control={control}
                            disabled={!watch(`${cell.row.index + 1}`)}
                            format={DATE_FORMAT_HH_mm}
                            error={
                              errors?.[
                                `picker${cell?.column?.id}${cell?.row?.id}`
                              ]?.message
                            }
                          />
                        ) : (
                          cell.render("Cell")
                        )}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledTable>
  );
};

export default BasicTable;
