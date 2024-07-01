import React, { useRef } from "react";
import { AntdTable } from "components";
import { useTableExpand } from "hooks";
import { IAssignment, IFetchTeachers, IRanking } from "types";
import ChildTable from "./components/childTable";
import Columns from "./components/columns";
import { Spin } from "antd";
import { useRouter } from "next/router";

export enum LostTypes {
  transferring = "100",
  stopping = "200",
}

const TableComponent = ({
  data,
  isLoading,
  ranking,
}: {
  data: IFetchTeachers<any> | undefined;
  ranking?: IRanking[];
  isLoading: boolean;
}) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const { onRowClick, expandedRowKeys } = useTableExpand();

  const renderRowSubComponent = React.useCallback(
    ({ row }: { row: { original: IAssignment } }) => {
      return (
        <div>
          <ChildTable row={row} width={ref?.current?.offsetWidth} />;
        </div>
      );
    },
    [],
  );

  return (
    <Spin spinning={false}>
      <div ref={ref}>
        <AntdTable
          loading={isLoading}
          className="main-table"
          columns={Columns({
            data,
            expandedRowKeys,
          })}
          scroll={!router.query.isExpanded ? { y: "900px" } : {}}
          expandable={{
            expandedRowRender: (record: any) =>
              renderRowSubComponent({ row: { original: record } }),
            expandedRowKeys,
            expandIcon: () => null,
          }}
          dataSource={
            data?.teachers
              ?.map((item, rowIndex) => {
                const data = ranking?.find(
                  (e) => e.base_mentor_id == item?.user_id,
                );
                return {
                  ...item,
                  id: rowIndex,
                  e: +(data?.lost_total || 0),
                  data,
                };
              })
              .sort((a, b) => a?.e - b?.e) || []
          }
          onRow={(record) => {
            return {
              onClick: () => {
                onRowClick({ id: record?.id });
              }, // click row
            };
          }}
        />
      </div>
    </Spin>
  );
};

export default TableComponent;
