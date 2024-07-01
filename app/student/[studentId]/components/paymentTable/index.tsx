import React from "react";
import { useRouter } from "next/router";
import { useStudentPaymentList } from "hooks";
import { AntdTable } from "components";
import Columns from "./columns";
import { PaymentWrapper } from "./style";

const PaymentTable = () => {
  const router = useRouter();
  const { data: paymentList, isLoading: paymentLoading } =
    useStudentPaymentList({
      user_id: router.query.studentId,
    });
  return (
    <PaymentWrapper>
      <AntdTable
        columns={Columns()}
        dataSource={paymentList ?? []}
        loading={paymentLoading}
      />
    </PaymentWrapper>
  );
};

export default PaymentTable;
