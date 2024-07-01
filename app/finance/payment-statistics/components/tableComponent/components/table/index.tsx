import React, { FC, useMemo, useRef } from "react";
import { AntdTable } from "components";
import { useTableExpand } from "hooks";
import { Wrapper } from "./style";
import { ITableC } from "./type";
import Columns from "./columns";
import StudentsList from "./components/studentsList";
import {
  IContactDetail,
  ITeacherObject,
} from "types/finance/paymentStatistics";
import { GROUP_MENTOR_100 } from "constants/groupMentors";
import { GROUP_FORM_GROUP } from "constants/groupForms";

const TableC: FC<ITableC> = ({ data, isLoading }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onRowClick, expandedRowKeys } = useTableExpand();

  const renderRowSubComponent = React.useCallback(
    ({ row }: any) => (
      <StudentsList row={row} width={ref?.current?.offsetWidth} />
    ),
    [],
  );

  const summ = useMemo(() => {
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    data?.data?.map((e: ITeacherObject) => {
      const value =
        e.groupCountDetail?.find(
          (i: IContactDetail) => i?.group_form == GROUP_MENTOR_100,
        )?.total || 0;
      const value1 =
        e.groupCountDetail?.find(
          (i: IContactDetail) => i?.group_form == GROUP_FORM_GROUP,
        )?.total || 0;
      total1 += Math.round(value);
      total2 += Math.round(value1);
      total3 += Math.round(+e.total_amount || 0);
    });
    return {
      total1,
      total2,
      total3,
    };
  }, [data.data]);

  return (
    <Wrapper ref={ref}>
      <div>
        <h1 className="title-table">
          {data.title}
          <span className="count grotesk">{data.count}</span>
        </h1>
      </div>
      <AntdTable
        columns={Columns(summ as any)}
        dataSource={
          data.data?.map((item, index) => ({
            ...item,
            id: index,
          })) ?? []
        }
        loading={isLoading}
        expandable={{
          expandedRowRender: (record: any) =>
            renderRowSubComponent({ row: { original: record } }),
          expandedRowKeys,
          expandIcon: () => null,
        }}
        pagination={false}
        onRow={(record, rowIndex) => {
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

export default TableC;
