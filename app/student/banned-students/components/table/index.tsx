import React from "react";
import { AntdTable } from "components";
import { Columns } from "./columns";
import { TWaitingList } from "types";

const BannedStudentListTable = ({
  data,
  isLoading,
}: {
  data: TWaitingList | undefined;
  isLoading: boolean;
}) => {
  return (
    <AntdTable
      columns={Columns()}
      dataSource={data?.list || []}
      loading={isLoading}
      pagination={{
        current: data?.meta?.currentPage,
        total: data?.meta?.totalCount,
      }}
    />
  );
};

export default BannedStudentListTable;
