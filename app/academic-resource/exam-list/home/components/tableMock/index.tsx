import React, { FC } from "react";
import { AntdTable } from "components";
import Columns from "./column";
import { usePageDataMemo } from "hooks";
import { Wrapper } from "./style";
import Router, { useRouter } from "next/router";
import { bgColors } from "styles/theme";
import moment from "moment";

interface ITableC {
  data: any;
  loading: boolean;
  meta: any;
}

const TableCMock: FC<ITableC> = ({ data = [], loading, meta }) => {
  const { args } = usePageDataMemo();
  const router = useRouter();

  const date = moment(router.query.date, "YYYY-MM");

  return (
    <Wrapper>
      <AntdTable
        columns={Columns()}
        onRow={(record) => {
          return {
            onClick: (event) => {
              event.stopPropagation();
              Router.push({
                pathname: `/academic-resource/exam-list/mock/${record?.id}`,
                query: {
                  year: date.format("YYYY"),
                  month: date.format("MM"),
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
        dataSource={data}
        loading={loading || args.isLoading || args.isPreviousData}
        pagination={{
          current: meta?.currentPage,
          total: meta?.totalCount,
          pageSize: meta?.perPage,
        }}
      />
    </Wrapper>
  );
};

export default TableCMock;
