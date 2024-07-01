import React from "react";
import Header from "./components/header";
import TableComponent from "./components/tabs";
import { useRouter } from "next/router";
import { useCallList } from "hooks";
import CallTable from "./components/table";
import { TableWrapper } from "./style";
import { ECallType } from "types/statistics/call";

const SMSStatistics = () => {
  const router = useRouter();

  const { data, isLoading, isPreviousData } = useCallList({
    query_params: {
      from_date: router.query.from_date,
      to_date: router.query.to_date,
      branches: router.query?.branch_id || null,
      page: router.query.page || 1,
      pageSize: router?.query.pageSize || 20,
      expand: "student.user",
      direction: router.query?.direction || ECallType.inbound,
    },
  });

  return (
    <div>
      <Header isLoading={isLoading} data={data} />
      <TableWrapper>
        <TableComponent data={data} />
        <div className="table">
          <CallTable data={data} isLoading={isPreviousData || isLoading} />
        </div>
      </TableWrapper>
    </div>
  );
};

export default SMSStatistics;
