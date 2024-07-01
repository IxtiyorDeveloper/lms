import React, { useRef } from "react";
import { TopActions, Wrapper } from "./style";
import { AntdTable, RedBadgeTitle } from "components";
import { useTableExpand } from "hooks";
import { MailSvg } from "components";
import Columns from "./components/columns";
import Collapse from "./components/collapse";
import { ITableType } from "./type";

const Table = ({ data }: ITableType) => {
  const ref = useRef<HTMLDivElement>(null);
  const width = ref?.current?.offsetWidth;
  const { onRowClick, expandedRowKeys } = useTableExpand();

  const renderRowSubComponent = React.useCallback(
    ({ row }: any) => <Collapse row={row} width={width} />,
    [width],
  );

  const fallibleReviews = !!data?.fallibleReviews
    ? data?.fallibleReviews?.map((item, index) => ({ ...item, id: index }))
    : [];

  return (
    <Wrapper ref={ref}>
      <TopActions>
        <RedBadgeTitle
          title="Teachers"
          count={data?.fallibleReviews?.length || 0}
        />
        <div className="item">
          <MailSvg />
        </div>
      </TopActions>
      <AntdTable
        columns={Columns({ expandedRowKeys })}
        dataSource={fallibleReviews}
        loading={false}
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

export default Table;
