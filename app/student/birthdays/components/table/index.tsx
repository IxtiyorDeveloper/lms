import React, { FC, Fragment } from "react";
import { AntdTable } from "components";
import { getWaitingListColumns } from "./components/column";
import { TList } from "types";

interface IProps {
  data: TList[] | undefined;
  isLoading: boolean;
}

const WaitingListTable: FC<IProps> = ({ data, isLoading }) => {
  return (
    <Fragment>
      <AntdTable
        columns={getWaitingListColumns()}
        dataSource={data || []}
        loading={isLoading}
      />
    </Fragment>
  );
};

export default WaitingListTable;
