import React from "react";
import { AntdTable } from "components";
import { childRow } from "../row";

const ChildTable = ({ rowData }: { rowData: any }) => {
  return (
    <AntdTable
      columns={childRow()}
      dataSource={rowData.original.components || [{}, {}]}
    />
  );
};

export default ChildTable;
