import React, { FC } from "react";
import { IPropsCashFlow } from "../../index";
import { Wrapper } from "./style";
import CashFlowParentTable from "./component/parentTable";
import { generateParentTable } from "./utils";
import {
  CreateTaskModal,
  TaskViewModal,
} from "app/tasks/home/components/board/components";

const ParentTable: FC<IPropsCashFlow> = ({
  data,
  total,
  bool,
  without_avans,
}) => {
  return (
    <Wrapper>
      <TaskViewModal />
      {generateParentTable({ data }).map((e) => {
        return (
          <CashFlowParentTable
            e={e}
            total={total}
            bool={bool}
            without_avans={!!without_avans}
          />
        );
      })}
      <CreateTaskModal />
    </Wrapper>
  );
};

export default ParentTable;
