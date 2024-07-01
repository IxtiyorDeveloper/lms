import React, { FC, Fragment } from "react";
import { AntdTable } from "components";
import { getWaitingListColumns } from "./components/column";
import { IFetchList } from "types";
import { OneStudent } from "types/student";

interface IProps {
  data: IFetchList<OneStudent> | undefined;
  isLoading: boolean;
  isPreviousData: boolean;
}

const CreateStudentTable: FC<IProps> = ({
  data,
  isLoading,
  isPreviousData,
}) => {
  return (
    <Fragment>
      <AntdTable
        columns={getWaitingListColumns() as any}
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

export default CreateStudentTable;
