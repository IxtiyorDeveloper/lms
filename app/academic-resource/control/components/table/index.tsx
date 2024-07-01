import React, { useCallback } from "react";
import { AntdTable } from "components";
import { useTableExpand } from "hooks";
import {
  IAcademicControl,
  IArsUserProfile,
  IControlAttendanceData,
} from "types";
import ChildTable from "../childTable";
import ProgressChildTable from "../progressChildTable";
import NoProgressColumns from "./noProgressColumns";
import HasProgressColumns from "./hasProgressColumns";
import { useRouter } from "next/router";

interface IProps {
  data?: IAcademicControl[] | IControlAttendanceData[];
  arsData?: IArsUserProfile[];
  isLoading: boolean;
  isArsProgress?: boolean;
  width?: number;
}

const AcademicControlTable = ({
  data,
  arsData,
  isLoading,
  isArsProgress = false,
  width = 0,
}: IProps) => {
  const router = useRouter();
  const renderRowSubComponent = useCallback(
    ({
      row: { original },
    }: {
      row: { original: IAcademicControl | IArsUserProfile };
    }) => {
      return isArsProgress ? (
        <ProgressChildTable width={width} data={original as IArsUserProfile} />
      ) : (
        <ChildTable width={width} data={original as any} />
      );
    },
    [isArsProgress, width],
  );
  const { onRowClick, expandedRowKeys } = useTableExpand({
    expandKey: isArsProgress ? "id" : "user_id",
  });
  return (
    <AntdTable
      columns={
        isArsProgress
          ? HasProgressColumns({
              expandedRowKeys,
              mode:
                router.query.teacherSupportKey != "200" ? "Teacher" : "Support",
            })
          : NoProgressColumns({ expandedRowKeys })
      }
      rowKey={isArsProgress ? "id" : "user_id"}
      dataSource={(isArsProgress ? arsData : data) || []}
      loading={isLoading}
      onRow={(record, key) => {
        return {
          onClick: () => {
            onRowClick(record);
          }, // click row
        };
      }}
      expandable={{
        expandedRowRender: (record: any) =>
          renderRowSubComponent({ row: { original: record } }),
        expandedRowKeys,
        expandIcon: () => null,
      }}
    />
  );
};

export default AcademicControlTable;
