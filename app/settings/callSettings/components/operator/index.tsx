import React from "react";
import { Wrapper } from "./style";
import TableComponent from "./table";
import Action from "./action";

const Operator = () => {
  return (
    <Wrapper>
      <Action />
      <TableComponent />
    </Wrapper>
  );
};

export default Operator;
