import React, { FC } from "react";
import { Wrapper } from "./style";
import { ComplexPaymentTab } from "./components";

const PaymentStatistics: FC = () => {
  return (
    <Wrapper>
      <ComplexPaymentTab />
    </Wrapper>
  );
};

export default PaymentStatistics;
