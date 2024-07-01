import React, { FC } from "react";
import { AntdTable } from "components";
import { ChildRows } from "../rows/childRows";
import { useCashFlowExpenseList } from "hooks";
import { useRouter } from "next/router";
import { ITransactionExpense } from "types/finance/transactionExpense";
import moment from "moment";
import { DATE_FORMAT_CREATED_AT } from "constants/dates";
import { Wrapper } from "./style";

const ChildTable: FC<{ row: any; total?: number; without_avans: boolean }> = ({
  row,
  total,
  without_avans,
}) => {
  const router = useRouter();
  const { isLoading, data } = useCashFlowExpenseList({
    query_params: {
      expand:
        "expenseLinks,expenseFiles,receivedBy.userProfile.avatar.children,linkedTasks",
      expense_category_id: row.original.expense_category_id,
      department_id: row.original.department_id,
      full: 1,
      year: router.query.year,
      month: router.query.month,
      without_avans,
    },
    enabled: !row?.original?.assignments,
  });
  return (
    <Wrapper className="expandable">
      <AntdTable
        columns={ChildRows({ total })}
        dataSource={row?.original?.assignments || data || []}
        loading={!row?.original?.assignments && isLoading}
        numberedRowColors={(
          data?.sort((a, b) =>
            moment(a.created_at, DATE_FORMAT_CREATED_AT).diff(
              moment(b.created_at, DATE_FORMAT_CREATED_AT),
            ),
          ) ?? []
        ).map((e: ITransactionExpense, index: number) => ({
          id: index + 2,
          color: e?.color,
        }))}
      />
    </Wrapper>
  );
};

export default ChildTable;
