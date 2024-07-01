import React, { FC } from "react";
import { ExpenseWrapper, TabNameWrapper } from "./style";
import { BankGradientSvg, CoinsSvg, RoundedTab } from "components";
import { bgColors, textColors } from "styles/theme";
import MotTable from "./table";
import { useRouter } from "next/router";
import { useExpenseList } from "hooks";
import { expand } from "./expand";
import { TaskViewModal } from "../../../../tasks/home/components/board/components";
export enum PaymentForms {
  MOT = 200,
  BANK = 100,
}
const allStyles = {
  tabWidth: "30%",
  tabsAlign: "left",
  paddingTab: "15px 16px",
  tabBg: bgColors.brilliance,
  activeTabBg: bgColors.primary,
  activeBg: bgColors.transparent,
  textColor: textColors.yourShadow,
  buttonBgColor: bgColors.transparent,
  activeTColor: textColors.sceptreBlue,
};
const Expense: FC = () => {
  const router = useRouter();
  const { data, isLoading } = useExpenseList({
    query_params: {
      expand: expand,
      ...router.query,
      payment_form: router.query?.payment_form?.toString() || PaymentForms.MOT,
      deleteExpense: undefined,
      expenseId: undefined,
      date: undefined,
    },
  });
  const tabs = [
    {
      title: () => (
        <TabNameWrapper>
          <CoinsSvg />
          MOT
        </TabNameWrapper>
      ),
      query: {
        payment_form: PaymentForms.MOT,
      },
      children: <MotTable data={data} isLoading={isLoading} />,
    },
    {
      title: () => (
        <TabNameWrapper>
          <BankGradientSvg height={25} width={25} /> Bank
        </TabNameWrapper>
      ),
      query: {
        payment_form: PaymentForms.BANK,
      },
      children: <MotTable data={data} isLoading={isLoading} />,
    },
  ];

  return (
    <ExpenseWrapper>
      <TaskViewModal />
      <RoundedTab
        tabName="expenseSecondaryTabIndex"
        tabs={tabs}
        allStyles={allStyles}
      />
    </ExpenseWrapper>
  );
};

export default Expense;
