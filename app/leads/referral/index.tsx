import React from "react";
import { Filter, Statistics, TableSide } from "./components";
import { Wrapper } from "./style";
import { MainHeadWithTitle } from "components";

const Referral = () => {
  return (
    <Wrapper>
      <MainHeadWithTitle title="REFERRALS" />
      <Filter />
      <Statistics />
      <TableSide />
    </Wrapper>
  );
};

export default Referral;
