import React from "react";
import { AntdTable } from "components";
import Column from "./columns";
import { useOperators } from "hooks";
import { DeleteOperator, OperatorModal } from "globals/components";
import { useRouter } from "next/router";
import DeleteTemplate from "globals/components/deleteTemplate";

const TableComponent = () => {
  const router = useRouter();
  const { data, isLoading, isPreviousData } = useOperators({
    query_params: {
      expand: "createdBy,user",
      ...router.query,
    },
  });
  return (
    <div>
      <OperatorModal />
      <DeleteOperator />
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
