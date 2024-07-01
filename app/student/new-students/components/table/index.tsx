import React, { FC } from "react";
import { AntdTable } from "components";
import { TWaitingList } from "types";
import { Columns } from "./columns";
import { ColumnGroupType } from "antd/lib/table";
interface Interface {
  data: TWaitingList | undefined;
  isLoading: boolean;
}

const TableComponent: FC<Interface> = ({ data, isLoading }) => {
  return (
    <AntdTable
      columns={Columns() as unknown as ColumnGroupType<any>[]}
      dataSource={data?.list || []}
      pagination={{
        current: data?.meta?.currentPage,
        total: data?.meta?.totalCount,
      }}
      loading={isLoading}
    />
  );
};

export default TableComponent;
