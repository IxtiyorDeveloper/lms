import React from "react";
import Columns from "./columns";
import { AntdTable } from "components";
import { useRegisteringList } from "hooks";
import { useRouter } from "next/router";
import { Spin } from "antd";

const TableComponent = () => {
  const router = useRouter();

  const { data, isLoading } = useRegisteringList({
    query_params: {
      start_date: router.query?.start_date,
      end_date: router.query?.end_date,
      gender: router.query?.gender,
      branch_id: router.query?.branch_id,
      age: router.query?.age,
      created_by: router.query?.created_by,
      search: router.query?.search,
    },
  });

  return (
    <Spin spinning={isLoading}>
      <AntdTable
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
        columns={Columns()}
        dataSource={data?.list}
      />
    </Spin>
  );
};

export default TableComponent;
