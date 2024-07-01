import React from "react";
import { AntdTable } from "components";
import Columns from "./columns";
import { Wrapper } from "./style";
import { useDates } from "hooks";
import { useRouter } from "next/router";
import { expand } from "./expand";

const TableSide = () => {
  const router = useRouter();

  const { data, isLoading } = useDates({
    year: router.query?.year,
    month: router.query?.month,
    expand,
  });

  return (
    <Wrapper>
      <AntdTable
        dataSource={data?.list || []}
        loading={isLoading}
        columns={Columns()}
      />
    </Wrapper>
  );
};

export default TableSide;
