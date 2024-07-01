import { PaginationProps } from "antd";

export type MyPaginationProps = Omit<
  PaginationProps,
  "selectComponentClass"
> & {
  pageCount?: number;
};
