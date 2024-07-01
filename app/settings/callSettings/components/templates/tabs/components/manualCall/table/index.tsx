import React from "react";
import { AntdTable } from "components";
import Column from "./columns";
import { DeleteOperator, OperatorModal } from "globals/components";
import { useRouter } from "next/router";
import { useTemplates } from "hooks";

const TableComponent = () => {
  const router = useRouter();
  const { data, isLoading, isPreviousData } = useTemplates({
    query_params: {
      expand: "createdBy,user",
      ...router.query,
    },
  });
  return (
    <div>
      <OperatorModal />
      <AntdTable
        loading={isLoading || isPreviousData}
        columns={Column()}
        dataSource={data?.list || []}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
      />
    </div>
  );
};

export default TableComponent;
