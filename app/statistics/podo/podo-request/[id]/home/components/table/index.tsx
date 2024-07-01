import React, { useMemo, useRef } from "react";
import { TopActions, Wrapper } from "./style";
import { AntdTable, RedBadgeTitle } from "components";
import { useTableExpand } from "hooks";
import { MailSvg } from "components";
import Columns from "./components/columns";
import Collapse from "./components/collapse";
import { ITableType } from "./type";
import { useRouter } from "next/router";
import { EStaffType } from "types/statistics/podoRequest";
import { useForm } from "react-hook-form";
import { ESortTypes } from "types";

const Table = ({ data }: ITableType) => {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const width = ref?.current?.offsetWidth;
  const { onRowClick, expandedRowKeys } = useTableExpand();

  const { control, watch } = useForm();

  const sort = watch("sort");

  const renderRowSubComponent = React.useCallback(
    ({ row }: any) => <Collapse row={row} width={width} />,
    [width],
  );

  const podoReviews = useMemo(() => {
    if (data?.podoReviews) {
      if (sort?.type == ESortTypes.asc) {
        return data?.podoReviews
          ?.map((item, index) => ({ ...item, id: index }))
          ?.sort((a, b) => {
            const p1 = (a?.doneReviewersCount * 100) / a?.allReviewersCount;
            const p2 = (b?.doneReviewersCount * 100) / b?.allReviewersCount;
            return p1 - p2;
          });
      }
      if (sort?.type == ESortTypes.desc) {
        return data?.podoReviews
          ?.map((item, index) => ({ ...item, id: index }))
          ?.sort((a, b) => {
            const p1 = (a?.doneReviewersCount * 100) / a?.allReviewersCount;
            const p2 = (b?.doneReviewersCount * 100) / b?.allReviewersCount;
            return p2 - p1;
          });
      }
      return data?.podoReviews?.map((item, index) => ({ ...item, id: index }));
    } else return [];
  }, [data, sort]);

  return (
    <Wrapper ref={ref}>
      <TopActions>
        <RedBadgeTitle
          title={
            Number(router.query?.staff_type) === EStaffType.TEACHER
              ? "Teachers"
              : "Support"
          }
          count={data?.podoReviews?.length || 0}
        />
        <div className="item">
          <MailSvg />
        </div>
      </TopActions>
      <AntdTable
        columns={Columns({ expandedRowKeys, control })}
        dataSource={podoReviews}
        loading={false}
        expandable={{
          expandedRowRender: (record: any) =>
            renderRowSubComponent({ row: record }),
          expandedRowKeys,
          expandIcon: () => null,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              onRowClick({ id: record?.id });
            },
          };
        }}
      />
    </Wrapper>
  );
};

export default Table;
