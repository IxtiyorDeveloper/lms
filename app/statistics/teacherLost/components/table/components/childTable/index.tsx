import React from "react";
import { useTeacherLostList } from "hooks";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { AntdTable } from "components";
import { Wrapper } from "./style";
import Columns from "./columns";
import { expand } from "./expand";

const ChildTable = ({ row, width }: any) => {
  const router = useRouter();
  const { data, isLoading } = useTeacherLostList({
    query_params: {
      year: router.query.year || moment().year(),
      month: router.query.month || moment().month() + 1,
      expand,
      teacher_id: row.original.user_id,
    },
  });

  return (
    <Wrapper className="child">
      <AntdTable
        scroll={{ x: width }}
        columns={Columns({ data })}
        dataSource={data?.lostStudents || []}
        loading={isLoading}
      />
    </Wrapper>
  );
};

export default ChildTable;
