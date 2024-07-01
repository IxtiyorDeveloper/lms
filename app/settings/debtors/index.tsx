import React, { FC } from "react";
import { DebtersWrapper } from "./style";
import Debtor from "./components";

const DebtorsPage: FC = () => {
  return (
    <DebtersWrapper>
      <Debtor />
    </DebtersWrapper>
  );
};

export default DebtorsPage;
