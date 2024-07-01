import React from "react";
import { AntdTable } from "components";
import { IFetchList, ILead } from "types";
import Columns from "./columns";
import { Wrapper } from "./style";

const RegisteredTable = ({
  leads,
  isLoading,
}: {
  leads: IFetchList<ILead> | undefined;
  isLoading: boolean;
}) => {
  return (
    <Wrapper>
      <AntdTable
        columns={Columns()}
        dataSource={leads?.list || []}
        pagination={{
          pageSize: 100,
          current: leads?.meta?.currentPage,
          total: leads?.meta?.totalCount,
        }}
        loading={isLoading}
      />
    </Wrapper>
  );
};

export default RegisteredTable;
