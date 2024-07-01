import React from "react";
import { Wrapper } from "./style";
import Action from "./action";
import TableComponent from "./table";

const ManualCall = () => {
  return (
    <Wrapper>
      <Action />
      <TableComponent />
    </Wrapper>
  );
};

export default ManualCall;
