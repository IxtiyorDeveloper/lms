import React from "react";
import ExpenseFilterComponent from "../expense/filter";
import IncomeFilterComponent from "../income/filter";
import { useRouter } from "next/router";
import { FilterWrapper } from "./style";
import { useExpenseCategoryList } from "hooks";

const Test = () => {
  const router = useRouter();

  const { data: categories, isLoading: categoryLoading } =
    useExpenseCategoryList({
      page: 1,
      pageSize: 100,
      expand: "children",
      full: 1,
    });

  const roundedTabIndex = router.query?.roundedTabIndex ?? "0";
  const filters = {
    "0": <IncomeFilterComponent />,
    "1": <ExpenseFilterComponent categories={categories} />,
  };
  return (
    <FilterWrapper>
      {filters[roundedTabIndex as keyof typeof filters]}
    </FilterWrapper>
  );
};

export default Test;
