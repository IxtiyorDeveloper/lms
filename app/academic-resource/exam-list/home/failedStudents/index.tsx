import React from "react";
import { Filter, Table } from "./components";
import { Wrapper } from "./style";
import { useExamPageData } from "hooks";
import { useRouter } from "next/router";

const FailedStudents = () => {
  const router = useRouter();
  const { data } = useExamPageData({
    query_params: {
      expand: "groups,teachers,supports,supervisors",
      month: router.query.month,
      year: router.query.year,
    },
  });

  return (
    <Wrapper>
      <Filter data={data} />
      <Table />
    </Wrapper>
  );
};

export default FailedStudents;
