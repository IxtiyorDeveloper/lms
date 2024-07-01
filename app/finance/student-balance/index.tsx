import React from "react";
import HeadSide from "./components/headSide";
import { Wrapper } from "./style";
import TableSide from "./components/tableSide";
import FilterComponent from "./components/filter";
import { useRouter } from "next/router";
import TransactionList from "./components/transactionsList";

const StudentBalance = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <HeadSide />
      <FilterComponent />
      {(router.query?.mainTab || "100") === "100" ? (
        <TableSide />
      ) : (
        <TransactionList />
      )}
    </Wrapper>
  );
};

export default StudentBalance;
