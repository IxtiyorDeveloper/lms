import React, { FC } from "react";
import { LeavingWrapper } from "./style";
import Table from "./components/table";

const LeavingCategoriesPage: FC = () => {
  return (
    <LeavingWrapper>
      <Table />
    </LeavingWrapper>
  );
};

export default LeavingCategoriesPage;
