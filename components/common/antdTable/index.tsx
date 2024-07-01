import React, { useEffect, useMemo } from "react";
import { Wrapper } from "./style";
import { TableSkeleton } from "../index";
import { Table } from "antd";
import { useRouter } from "next/router";
import { ColumnGroupType, ColumnType } from "antd/lib/table/interface";
import { calculateNumberOfPages } from "utils/calculateNumberOfPages";
import { AntTableProps, Interface } from "./type";
import { MyPagination } from "components";

const initialPageSize = 20;

const AntdTable = (props: AntTableProps) => {
  const pagination: false | Interface | undefined = props.pagination;
  const isExpandIconVisible: boolean = props.isExpandIconVisible || false;
  const router = useRouter();

  const defaultPageSize = useMemo(() => {
    if (pagination) {
      if (pagination.pageSize) {
        return pagination.pageSize;
      } else return initialPageSize;
    } else return initialPageSize;
  }, [pagination]);

  const pageSize = +(router.query.pageSize?.toString() || defaultPageSize);

  const pageCount = useMemo(() => {
    if (pagination) {
      return calculateNumberOfPages({
        pageSize: +pageSize,
        total: pagination.total,
      });
    }
  }, [pagination, pageSize]);

  useEffect(() => {
    if (pagination) {
      if (
        pagination?.current?.toString() === pageCount?.toString() &&
        +(router?.query?.page || 0) > +(pageCount || 0) &&
        pageCount &&
        router?.query?.page
      ) {
        router.replace(
          {
            query: { ...router.query, page: pageCount },
          },
          undefined,
          { scroll: false }
        );
      }
    }
  }, [pagination, router?.query?.page]);

  useEffect(() => {
    if (+(router.query?.pageSize || 0) > 100) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, pageSize: 100 },
        },
        undefined,
        { scroll: false }
      );
    }
  }, [router.query?.pageSize]);

  return (
    <Wrapper
      isExpandIconVisible={isExpandIconVisible}
      numberedRowColors={props.numberedRowColors}
    >
      {props.loading && <TableSkeleton />}
      <div
        className={`basic-table-container ${props.loading ? "loading" : ""}`}
      >
        <Table
          rowClassName={props.rowClassName ?? ""}
          scroll={props.scroll || { x: "max-content" }}
          rowKey="id"
          {...props}
          columns={props.columns as (ColumnGroupType<any> | ColumnType<any>)[]}
          pagination={false}
        />
        {pagination ? (
          <div className="pagination">
            <MyPagination
              current={pagination?.current}
              total={pagination?.total}
              pageCount={pageCount}
              pageSize={pageSize}
            />
          </div>
        ) : null}
      </div>
    </Wrapper>
  );
};

export default AntdTable;
