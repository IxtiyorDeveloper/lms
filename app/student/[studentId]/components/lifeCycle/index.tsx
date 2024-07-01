import React from "react";
import { useStudentLifeCycle } from "hooks";
import Router, { useRouter } from "next/router";
import { AntdTable, SelectMonth } from "components";
import { Wrapper } from "./style";
import Columns from "./columns";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM } from "constants/dates";

const LifeCycleTable = () => {
  const router = useRouter();
  const { data, isLoading, isPreviousData } = useStudentLifeCycle({
    month: moment(router?.query?.lifeCycleDate).format("MM"),
    year: moment(router?.query?.lifeCycleDate).year(),
    user_id: router?.query?.studentId,
  });

  return (
    <Wrapper>
      <SelectMonth
        mx="24px"
        onChange={(e) => {
          router.replace({
            pathname: Router.pathname,
            query: {
              ...Router.query,
              lifeCycleDate: moment(e)?.format(DATE_FORMAT_YYYY_MM),
            },
          });
        }}
      />
      <AntdTable
        dataSource={data ?? []}
        columns={Columns()}
        loading={isLoading || isPreviousData}
        scroll={undefined}
      />
    </Wrapper>
  );
};

export default LifeCycleTable;
