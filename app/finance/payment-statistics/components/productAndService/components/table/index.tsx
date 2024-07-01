import React, { FC, useRef } from "react";
import { AntdTable } from "components";
import { useTableExpand } from "hooks";
import { Wrapper } from "./style";
import { ITableC } from "./type";
import Columns from "./columns";
import StudentsList from "./components/studentsList";

const TableC: FC<ITableC> = ({ data, isLoading }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onRowClick, expandedRowKeys } = useTableExpand();

  const renderRowSubComponent = React.useCallback(
    ({ row }: any) => (
      <StudentsList row={row} width={ref?.current?.offsetWidth} />
    ),
    [],
  );

  return (
    <Wrapper ref={ref}>
      <AntdTable
        columns={Columns({ expandedRowKeys })}
        dataSource={data}
        loading={isLoading}
        expandable={{
          expandedRowRender: (record: any) =>
            renderRowSubComponent({ row: { original: record } }),
          expandedRowKeys,
          expandIcon: () => null,
        }}
        rowKey="origin_id"
        onRow={(record) => {
          return {
            onClick: (event) => {
              onRowClick({ id: record?.origin_id });
            }, // click row
          };
        }}
      />
    </Wrapper>
  );
};

export default TableC;
