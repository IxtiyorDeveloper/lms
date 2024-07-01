import React from "react";
import { AntdTable } from "components";
import { useHolidays, usePageDataMemo } from "hooks";
import Columns from "./columns";
import { useRouter } from "next/router";

const HolidayTable = () => {
  const router = useRouter();
  const { data, isLoading } = useHolidays({
    page: router?.query?.page,
    pageSize: router?.query?.pageSize,
    expand: "grouped_notify_type,dates",
  });
  const { companyEnumsHolidayTypes, groupContactEnumsStudyStatuses, args } =
    usePageDataMemo();
  return (
    <AntdTable
      loading={isLoading || args?.isLoading}
      dataSource={data?.list ?? []}
      columns={Columns({
        companyEnumsHolidayTypes,
        groupContactEnumsStudyStatuses,
      })}
      pagination={{
        current: data?.meta?.currentPage,
        total: data?.meta?.totalCount,
      }}
    />
  );
};

export default HolidayTable;
