import React, { FC } from "react";
import { AntdTable } from "components";
import { row } from "./row";
import { IStaffMotivation } from "types";

const TableElement: FC<{
  KPIData: IStaffMotivation[] | undefined;
  isLoading: boolean;
}> = ({ KPIData, isLoading = true }) => {
  return (
    <div className="table">
      <AntdTable
        columns={row()}
        dataSource={KPIData || []}
        loading={isLoading}
      />
    </div>
  );
};

export default TableElement;
