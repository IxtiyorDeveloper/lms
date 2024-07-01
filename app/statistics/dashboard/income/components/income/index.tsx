import React from "react";
import { IncomeWrapper } from "./style";
import { useForm } from "react-hook-form";
import {
  RealTotalByBranchesCard,
  RealTotalByCashiersShareCard,
  RealTotalByGroupFormCard,
  RealTotalByGroupTypeCard,
  RealTotalByHourAndWeekCard,
  RealTotalByOnlinePaymentTypesCard,
  RealTotalByPaymentProgressCard,
  RealTotalByPaymentTypesCard,
  RealTotalByStudentStatusCard,
  RealTotalCard,
} from "./cards";

const Income = () => {
  const { watch } = useForm({
    defaultValues: {
      branch: -1,
    },
  });

  return (
    <IncomeWrapper>
      <RealTotalByPaymentProgressCard />
      <RealTotalCard />
      <RealTotalByStudentStatusCard watch={watch} />
      <RealTotalByOnlinePaymentTypesCard watch={watch} />
      <RealTotalByPaymentTypesCard watch={watch} />
      <RealTotalByBranchesCard />
      <RealTotalByGroupFormCard />
      <RealTotalByGroupTypeCard />
      <RealTotalByCashiersShareCard />
      <RealTotalByHourAndWeekCard />
    </IncomeWrapper>
  );
};

export default Income;
