import React, { FC } from "react";
import { AntdTable } from "components";
import { Columns } from "./columns";

const TableComponent: FC<{
  data: any;
  isLoading: boolean;
}> = ({ data, isLoading }) => {
  return (
    <AntdTable
      columns={Columns()}
      dataSource={data?.list as Array<any>}
      pagination={{
        current: data?.meta?.currentPage,
        total: data?.meta?.totalCount,
      }}
      loading={isLoading}
    />
  );
};

export default TableComponent;
