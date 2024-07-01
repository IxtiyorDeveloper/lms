import React from "react";
import { DepartmentSidebar } from "./components";
import { Wrapper } from "./style";
import DeleteVacation from "./components/modals/deleteVcation";

const ContentSide = () => {
  return (
    <Wrapper>
      <DepartmentSidebar />
      <DeleteVacation />
    </Wrapper>
  );
};

export default ContentSide;
