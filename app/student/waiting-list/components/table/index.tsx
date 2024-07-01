import React, { FC, Fragment } from "react";
import { AntdTable } from "components";
import { getWaitingListColumns } from "./components/column";
import { TWaitingList } from "types";

interface IProps {
  data: TWaitingList | undefined;
  isLoading: boolean;
  isPreviousData: boolean;
}

const WaitingListTable: FC<IProps> = ({ data, isLoading, isPreviousData }) => {
  return (
    <Fragment>
      <AntdTable
        columns={getWaitingListColumns()}
        dataSource={data?.list || []}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
        loading={isLoading || isPreviousData}
      />
    </Fragment>
  );
};

export default WaitingListTable;
