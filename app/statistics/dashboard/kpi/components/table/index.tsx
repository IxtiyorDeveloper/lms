import React, { FC } from "react";
import { AntdTable } from "components";
import { useTableExpand } from "hooks";
import { row } from "./row";
import { IStaff } from "types";
import _ from "lodash";
import ChildTable from "./childTable";

const TableElement: FC<{
  KPIData: IStaff[] | undefined;
  isLoading: boolean;
}> = ({ KPIData, isLoading = true }) => {
  const { onRowClick, expandedRowKeys } = useTableExpand({ expandKey: "key" });

  const renderRowSubComponent = React.useCallback(({ row: rowData }: any) => {
    return <ChildTable rowData={rowData} />;
  }, []);

  return (
    <div className="table">
      <AntdTable
        columns={row()}
        dataSource={
          _.sortBy(KPIData, (e) => -_.sumBy(e.components, "value"))?.map(
            (item, index) => ({
              ...item,
              key: index,
            }),
          ) || []
        }
        loading={isLoading}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              onRowClick({ key: rowIndex });
            }, // click row
          };
        }}
        rowKey="key"
        expandable={{
          expandedRowRender: (record: any) =>
            renderRowSubComponent({ row: { original: record } }),
          expandedRowKeys,
          expandIcon: () => null,
        }}
      />
    </div>
  );
};

export default TableElement;
