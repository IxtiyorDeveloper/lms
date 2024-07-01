import React from "react";
import { Wrapper } from "./style";
import TableTop from "./components/top";
import { AntdTable } from "components";
import { useTableExpand } from "hooks";
import Columns from "./components/columns";
import Collapse from "./components/collapse";
import { useObservationList } from "hooks";
import { useRouter } from "next/router";
import moment from "moment";
import { expand } from "./expand";
import { EObservationStaff, IObservationStatistics } from "types/observation";
import { ObservationBranch } from "../top/type";

const TableSide = ({ data }: { data: IObservationStatistics | undefined }) => {
  const router = useRouter();
  const currentBranch =
    router.query.branch_id?.toString() ?? ObservationBranch.all;

  const type = router.query?.tab?.toString() ?? EObservationStaff.teacher;

  const { onRowClick, expandedRowKeys } = useTableExpand();

  const branch_id =
    currentBranch == ObservationBranch.all ? undefined : currentBranch;

  const {
    data: observations,
    isLoading,
    isPreviousData,
  } = useObservationList({
    query_params: {
      year: router.query?.year || moment().format("YYYY"),
      month: router.query?.month || moment().format("MM"),
      expand,
      branch_id,
      type,
      search: router.query?.search,
      sort: router.query?.sort,
    },
  });

  const renderRowSubComponent = React.useCallback(
    ({ row }: any) => <Collapse row={row} />,
    [],
  );

  return (
    <Wrapper>
      <TableTop type={type} data={data} />
      <AntdTable
        columns={Columns({ expandedRowKeys, type })}
        dataSource={observations}
        loading={isLoading || isPreviousData}
        expandable={{
          expandedRowRender: (record: any) =>
            renderRowSubComponent({ row: record }),
          expandedRowKeys,
          expandIcon: () => null,
        }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              onRowClick({ id: record?.id });
            }, // click row
          };
        }}
      />
    </Wrapper>
  );
};

export default TableSide;
