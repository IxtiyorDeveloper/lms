import { TablePaginationConfig } from "antd/lib";
import { TableProps } from "antd";
import { ColumnGroupType, ColumnType } from "antd/lib/table/interface";

export interface Interface extends TablePaginationConfig {}

export interface AntTableProps extends Omit<TableProps<any>, "columns"> {
  columns: (ColumnGroupType<any> | ColumnType<any> | boolean)[];
  numberedRowColors?: any;
  isExpandIconVisible?: boolean;
}
