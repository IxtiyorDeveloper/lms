import React, { FC } from "react";
import { AntdTable } from "components";
import Columns from "./column";
import { usePageDataMemo } from "hooks";
import { Wrapper } from "./style";
import Router from "next/router";
import { bgColors } from "styles/theme";

interface ITableC {
  data: any;
  loading: boolean;
  meta: any;
}

const TableC: FC<ITableC> = ({ data = [], loading, meta }) => {
  const { args } = usePageDataMemo();
  return (
    <Wrapper>
      <AntdTable
        columns={Columns()}
        onRow={(record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
              Router.push({
                pathname: `/academic-resource/exam-list/${record?.group?.id}`,
                query: {
                  year: record.year,
                  month: record.month,
                },
              }).then();
            },
          };
        }}
        numberedRowColors={(data ?? []).map((e: any, index: number) => {
          return {
            id: index + 2,
            color: e?.is_checked ? bgColors.spring : "",
          };
        })}
        scroll={{ x: 1350 }}
        dataSource={data}
        loading={loading || args.isLoading || args.isPreviousData}
        pagination={{
          current: meta?.currentPage,
          total: meta?.totalCount,
        }}
      />
    </Wrapper>
  );
};

export default TableC;
