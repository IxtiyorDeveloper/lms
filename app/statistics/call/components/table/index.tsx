import React, { FC } from "react";
import { AntdTable } from "components";
import { Spin } from "antd";
import Columns from "./columns";
import { ICallStatistics } from "types/statistics/call";
import { IFetchList } from "types";

interface IAutoSMS {
  data: IFetchList<ICallStatistics, any> | undefined;
  isLoading: boolean;
}

const CallTable: FC<IAutoSMS> = ({ data, isLoading }) => {
  return (
    <Spin spinning={isLoading}>
      <AntdTable
        columns={Columns()}
        dataSource={data?.list || []}
        loading={isLoading}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
      />
    </Spin>
  );
};

export default CallTable;
