import React from "react";
import { AntdTable as CustomTable } from "components";
import { TWaitingList } from "types";
import { Columns } from "./columns";

const Index = ({
  data,
  isLoading,
}: {
  data: TWaitingList | undefined;
  isLoading: boolean;
}) => {
  return (
    <CustomTable
      columns={Columns()}
      dataSource={data?.list || []}
      loading={isLoading}
      pagination={{
        current: data?.meta?.currentPage,
        total: data?.meta?.totalCount,
        pageSize: 40,
      }}
    />
  );
};

export default Index;
