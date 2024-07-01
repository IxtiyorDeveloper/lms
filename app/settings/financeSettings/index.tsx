import React from "react";
import { ComplexThinTab } from "components";
import { Wrapper } from "./style";
import { useRouter } from "next/router";
import ProductServices from "./components/product-services";
import ExpenseCategory from "./components/expenseCategory";
import Payment from "./components/payment";

const leftChild = { "0": "", "1": "", "2": "", "3": "" };

const menu = [
  {
    label: "Product & Services",
    children: <ProductServices />,
    query: { mainTab: 0 },
    isClickable: true,
  },
  {
    label: "Expense categories",
    children: <ExpenseCategory />,
    query: { mainTab: 1 },
    isClickable: true,
  },
  {
    label: "Payment",
    children: <Payment />,
    query: { mainTab: 2 },
    isClickable: true,
  },
];

const FinanceSettings = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <ComplexThinTab
        paddingTab="0 20px"
        headPadding={20}
        initValue={+(router.query.mainTab || 0) as any}
        menu={menu}
        topLeftChildren={
          leftChild[router.query.mainTab as keyof typeof leftChild]
        }
      />
    </Wrapper>
  );
};

export default FinanceSettings;
