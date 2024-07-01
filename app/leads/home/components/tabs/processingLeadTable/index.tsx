import React, { FC } from "react";

import { AntdTable } from "components";
import { useLeadTabs } from "hooks";
import { IFetchList, ILead } from "types";
import { Columns } from "./rows";
import { Wrapper } from "./style";

export type Type = {
  leads: IFetchList<ILead> | undefined;
  isLoading: boolean;
  isCreatedTabs: boolean;
};
const ProcessingLeadTable: FC<Type> = ({ leads, isLoading, isCreatedTabs }) => {
  const { data: tabs } = useLeadTabs();

  return (
    <Wrapper
      numberedRowColors={(leads?.list ?? []).map((e, index) => ({
        id: index + 2,
        color: e.color,
      }))}
    >
      <AntdTable
        columns={Columns({
          tabs,
          isCreatedTabs,
        })}
        dataSource={leads?.list ?? []}
        loading={isLoading}
        pagination={{
          pageSize: 100,
          current: leads?.meta?.currentPage,
          total: leads?.meta?.totalCount,
        }}
      />
    </Wrapper>
  );
};

export default ProcessingLeadTable;
