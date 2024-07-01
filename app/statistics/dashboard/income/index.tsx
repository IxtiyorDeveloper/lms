import React from "react";
import { Wrapper } from "./style";
import Filter from "./components/filter";
import Income from "./components/income";

const IncomePage = () => {
  return (
    <Wrapper>
      <Filter />
      <Income />
    </Wrapper>
  );
};

export default IncomePage;
