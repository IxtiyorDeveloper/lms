import React, { CSSProperties } from "react";
import { Heading } from "./style";

//.basic-table-container tbody tr td {
//  padding: 0 !important;
//}
//.basic-table-container tbody tr {
//  .ant-table-row-expand-icon-cell {
//    padding: 0 !important;
//    width: 10px !important;
//    margin-right: -20px !important;
//    background: red !important;
//  }
//}
interface IProps {
  text?: string;
  children?: any;
  color?: string;
  padding?: boolean;
  isId?: boolean;
  className?: string;
  style?: CSSProperties;
  gap?: string;
}

const TableHeading = ({
  text,
  className,
  children,
  color,
  padding = false,
  style,
  isId,
  gap,
}: IProps) => {
  return (
    <Heading
      padding={padding}
      className={className}
      style={{
        paddingLeft: isId ? "30px" : "unset",
        color: color,
        gap,
        ...style,
      }}
    >
      {text || children}
    </Heading>
  );
};

export default TableHeading;
