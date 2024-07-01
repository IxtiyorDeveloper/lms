import React, { FC } from "react";
import { AntdTable } from "components";
import { Columns } from "./columns";
import { TList } from "types";
import { LABEL_COLOR_CHANGE } from "constants/labels";
import { Wrapper } from "./style";

const TableComponent: FC<{
  data: any;
  isLoading: boolean;
  columns: string[];
}> = ({ data, isLoading, columns }) => {
  const columnsData = Columns({ columns });
  return (
    <Wrapper
      numberedRowColors={(data?.list ?? []).map((e: TList, index: number) => ({
        id: index + 2,
        color: e?.user?.userLabels?.find(
          (label) => label.type?.toString() === LABEL_COLOR_CHANGE?.toString(),
        )?.color,
      }))}
    >
      <AntdTable
        columns={columnsData}
        dataSource={data?.list || []}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
        loading={isLoading}
        rowKey="user_id"
      />
    </Wrapper>
  );
};

export default TableComponent;
