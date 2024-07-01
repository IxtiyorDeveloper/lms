import React, { FC } from "react";
import { Filter, Statistics, TableComponent } from "./components";
import { TransactionsWrapper } from "./style";
import CreateTransactionModal from "globals/components/transactionModal";
import { DivideExpenseModal } from "globals/components";
import { useSelector } from "react-redux";
import { IStore } from "store";
import TransactionLifeCycle from "globals/components/transactionLifeCycle";
import TransactionPaymentModal from "globals/components/paymentTransaction";
import NewTransactionModal from "globals/components/new-transactionModal";

const Transactions: FC = () => {
  const modals = useSelector((state: IStore) => state.modals);

  return (
    <TransactionsWrapper>
      {modals?.paymentTransaction.open && <TransactionPaymentModal />}
      <CreateTransactionModal />
      <NewTransactionModal />
      <TransactionLifeCycle />
      {modals?.divideExpense.open && <DivideExpenseModal />}
      <Filter />
      <Statistics />
      <div className="mt16">
        <TableComponent />
      </div>
    </TransactionsWrapper>
  );
};

export default Transactions;
