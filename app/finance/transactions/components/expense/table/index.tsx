import React, { FC, useEffect, useState } from "react";
import { Button, PlusSvg, RedBadgeTitle, AntdTable } from "components";
import { PaddingWrapper, Wrapper } from "../../income/productAndService/style";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { Columns } from "./columns";
import { IFetchList } from "types";
import { ITransactionExpense } from "types/finance/transactionExpense";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { FINANCE_MOT } from "constants/finance";
import { useRouter } from "next/router";
import { queryKeys } from "constants/queryKeys";

const MotTable: FC<{
  data: IFetchList<ITransactionExpense> | undefined;
  isLoading: boolean;
}> = ({ data, isLoading }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [dividedRowNumbers, setDividedRowNumbers] = useState<number[]>([]);
  const [list, setList] = useState<ITransactionExpense[]>([]);
  const handleToggleExpense = () => {
    dispatch(
      toggleModal({
        key: "createExpense",
        data: {
          open: true,
          data: {
            queryKeys: [
              queryKeys.admin_finance_expense_index,
              queryKeys.admin_finance_statistic,
            ],
            action: "create",
          },
        },
      })
    );
  };

  useEffect(() => {
    if (data?.list) {
      function groupExpenses(expenses: ITransactionExpense[]) {
        const filteredExpenses = expenses.filter(
          (expense) => expense.expense_group_id !== null
        );

        const groupedExpenses = Object.values(
          filteredExpenses.reduce((acc, expense) => {
            if (!acc[expense.expense_group_id as keyof typeof acc]) {
              (acc[expense.expense_group_id as keyof typeof acc] as any) = [
                expense,
              ];
            } else {
              (acc[expense.expense_group_id as keyof typeof acc] as any).push(
                expense
              );
            }
            return acc;
          }, {})
        );
        const nullExpenses = expenses
          .filter((expense) => expense.expense_group_id === null)
          .map((expense) => [{ ...expense }]);

        return [...groupedExpenses, ...nullExpenses];
      }

      function findNearestDate(arr: string | any[]) {
        let nearestDate = null;
        let nearestDiff = Infinity;
        const now: any = new Date();

        for (let i = 0; i < arr.length; i++) {
          const createdAt: any = new Date(arr[i].created_at);
          const diff = Math.abs(now - createdAt);
          if (diff < nearestDiff) {
            nearestDate = createdAt;
            nearestDiff = diff;
          }
        }

        return nearestDate;
      }

      // Sort the parent array based on the nearest dates

      const arr: ITransactionExpense[][] = (
        groupExpenses(data?.list) as any
      ).sort((a: string | any[], b: string | any[]) => {
        const nearestDateA = findNearestDate(a);
        const nearestDateB = findNearestDate(b);
        const diffA = Math.abs((new Date() as any) - nearestDateA);
        const diffB = Math.abs((new Date() as any) - nearestDateB);
        return diffA - diffB;
      });

      setList(arr.flat());
      let tempArray: number[] = [];
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].length > 1) {
          tempArray = [
            ...tempArray,
            arr.flat().findIndex((index) => index.id == arr[j][0]?.id) + 1,
            arr
              .flat()
              .findIndex((index) => index.id == arr[j][arr[j].length - 1]?.id) +
              2,
          ];
        }
      }
      setDividedRowNumbers(tempArray);
    }
  }, [data?.list]);

  return (
    <Wrapper divideRowNumbers={dividedRowNumbers}>
      <PaddingWrapper>
        <RedBadgeTitle
          title={
            FINANCE_MOT?.toString() ===
              router?.query?.payment_form?.toString() ||
            !router?.query?.payment_form
              ? "MOT"
              : "Bank"
          }
          count={data?.meta?.totalCount}
        />
        <CheckPermission permission={[COMPONENTS_VIEWS.can_create_expense]}>
          <Button onClick={handleToggleExpense}>
            <PlusSvg />
            &nbsp; Expense
          </Button>
        </CheckPermission>
      </PaddingWrapper>
      <AntdTable
        columns={Columns()}
        // bottomBorderColor={bgColors.whiteSmoke}
        dataSource={list ?? []}
        loading={isLoading}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
      />
    </Wrapper>
  );
};

export default MotTable;
