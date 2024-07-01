import React from "react";
import { AntdTable as CustomTable } from "components";
import { IAbsentStudents } from "types/absentStudents";
import { IFetchList } from "types";
import { Columns } from "./components/columns";

const Table = ({
  data,
  isLoading,
}: {
  data: IFetchList<IAbsentStudents[]> | undefined;
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
