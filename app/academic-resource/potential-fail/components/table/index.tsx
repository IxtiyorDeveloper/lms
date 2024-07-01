import React, { useCallback } from "react";
import { AntdTable } from "components";
import { useTableExpand } from "hooks";
import { IAcademicControl, IArsUserProfile, IPotentialFail } from "types";
import ChildTable from "../childTable";
import Columns from "./columns";

interface IProps {
  data?: IPotentialFail["data"];
  arsData?: IArsUserProfile[];
  isLoading: boolean;
  width?: number;
}

const AcademicControlTable = ({ data, isLoading, width = 0 }: IProps) => {
  const renderRowSubComponent = useCallback(
    ({ original }: { original: IAcademicControl | IArsUserProfile }) => {
      return <ChildTable width={width} data={original as any} />;
    },
    [width],
  );

  const { onRowClick, expandedRowKeys } = useTableExpand({
    expandKey: "user_id",
  });

  return (
    <AntdTable
      columns={Columns({ expandedRowKeys })}
      rowKey="user_id"
      dataSource={data || []}
      loading={isLoading}
      onRow={(record, key) => {
        return {
          onClick: () => {
            onRowClick(record);
          }, // click row
        };
      }}
      expandable={{
        expandedRowRender: (record: any): any =>
          renderRowSubComponent({ original: record }),
        expandedRowKeys,
        expandIcon: () => null,
      }}
    />
  );
};

export default AcademicControlTable;
