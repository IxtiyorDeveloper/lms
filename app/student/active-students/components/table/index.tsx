import React, { FC } from "react";
import { AntdTable } from "components";
import { TWaitingList } from "types";
import { ColumnGroupType } from "antd/lib/table";
import { Wrapper } from "./style";
import { numberRowColors } from "./utils/numberRowColors";
import { Columns } from "./columns";

interface Interface {
  data: TWaitingList | undefined;
  isLoading: boolean;
  columns: string[] | undefined;
}

const ActiveStudentTable: FC<Interface> = ({ data, isLoading, columns }) => {
  return (
    <Wrapper numberedRowColors={numberRowColors({ data })}>
      <AntdTable
        columns={Columns({ columns }) as unknown as ColumnGroupType<any>[]}
        dataSource={data?.list ?? []}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
        loading={isLoading}
      />
    </Wrapper>
  );
};

export default ActiveStudentTable;
