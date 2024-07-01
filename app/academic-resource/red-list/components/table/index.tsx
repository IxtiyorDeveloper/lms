import React from "react";
import { AntdTable as CustomTable } from "components";
import { Columns } from "./components/rows/rows";
import { IRedList } from "types/absentStudents";
import { IFetchList } from "types";

const Table = ({
  data,
  isLoading,
}: {
  data: IFetchList<IRedList> | undefined;
  isLoading: boolean;
}) => {
  return (
    <CustomTable
      columns={Columns()}
      dataSource={data?.list || []}
      pagination={{
        current: data?.meta?.currentPage,
        total: data?.meta?.totalCount,
      }}
      loading={isLoading}
    />
  );
};

export default Table;
