import React from "react";
import MessageFilter from "./components/messageFilter";
import Index from "./components/table";
import { WaitingListFilterWrapper } from "./components/filter/style";
import FilterComponent from "./components/filter";
import { useRouter } from "next/router";
import {
  useDebtorsStudents,
  useDebtorStatistics,
  usePageDataMemo,
} from "hooks";
import {
  STOPPING_STUDENT,
  STUDYING_STUDENT,
  TRANSFERRING_STUDENT,
} from "constants/studentStatuses";
import { PAYMENT_NOT_PAID, PAYMENT_PARTIALLY_PAID } from "constants/payment";
import { TableWrapper, AllDebts } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { useUserLabelSelect } from "utils/functions/userLabelSelect";
import { labelOptions } from "components";
import DebtorsStatistics from "./components/statistics";
import { funcCheckPermission } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { expand } from "./expand";

const Debtors = () => {
  const router = useRouter();

  const { activeStudentLabels } = usePageDataMemo();

  const filters = useUserLabelSelect(
    labelOptions.filter((option) =>
      activeStudentLabels.some((label) => label.value == option.value)
    )
  );

  const status = router.query?.status;

  const { isLoading, isPreviousData, data } = useDebtorsStudents({
    status: [STUDYING_STUDENT, TRANSFERRING_STUDENT, STOPPING_STUDENT],
    ...router.query,
    payment_state: router.query?.payment_state || [
      PAYMENT_PARTIALLY_PAID,
      PAYMENT_NOT_PAID,
    ],
    ...filters,
    expand,
  });

  const { data: debtorsStatistics, isLoading: isDebtorLoading } =
    useDebtorStatistics({
      query_params: {
        status,
        branch_id: router.query?.branch_id,
      },
      body: {
        excluded_will_pay_dates: router.query?.excluded_will_pay_dates,
      },
    });

  const can_see_debt_statistics = funcCheckPermission([
    COMPONENTS_VIEWS.can_see_debt_statistics,
  ]);

  return (
    <div>
      <WaitingListFilterWrapper>
        <FilterComponent />
      </WaitingListFilterWrapper>
      {can_see_debt_statistics && (
        <TableWrapper>
          <DebtorsStatistics
            data={debtorsStatistics}
            isLoading={isDebtorLoading}
          />
        </TableWrapper>
      )}
      <TableWrapper>
        <MessageFilter data={data} />
        {!!data?.debts && (
          <AllDebts>
            <p className="title">Total debtors :</p>
            <p className="sum grotesk">{toCurrencyFormat(+data?.debts)}</p>
          </AllDebts>
        )}

        <Index isLoading={isLoading || isPreviousData} data={data} />
      </TableWrapper>
    </div>
  );
};

export default Debtors;
