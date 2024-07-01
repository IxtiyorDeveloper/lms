import React from "react";
import Router, { useRouter } from "next/router";
import { useStudentCallHistory } from "hooks";
import { AntdTable, SelectMonth } from "components";
import Columns from "./columns";
import { CallTableWrapper, MonthWrapper } from "./style";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM } from "constants/dates";

const CallHistoryTable = () => {
  const router = useRouter();

  const year = moment(router.query?.callHistoryDate, "YYYY-MM").year();
  const month = moment(router.query?.callHistoryDate, "YYYY-MM").format("MM");

  const { data: callList, isLoading: callLoading } = useStudentCallHistory({
    id: router.query.studentId,
    year: year,
    month: month,
    expand: "createdBy.rbacAssignment.rbacRole",
  });

  return (
    <CallTableWrapper>
      <MonthWrapper>
        <SelectMonth
          mx="24px"
          onChange={(e) => {
            router
              .replace({
                pathname: Router.pathname,
                query: {
                  ...Router.query,
                  callHistoryDate: moment(e)?.format(DATE_FORMAT_YYYY_MM),
                },
              })
              .then();
          }}
        />
      </MonthWrapper>
      <AntdTable
        columns={Columns()}
        dataSource={callList ?? []}
        loading={callLoading}
        scroll={{ x: 700 }}
      />
    </CallTableWrapper>
  );
};

export default CallHistoryTable;
