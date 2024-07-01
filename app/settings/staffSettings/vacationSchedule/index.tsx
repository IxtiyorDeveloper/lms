import React from "react";
import { Wrapper } from "./style";
import { ContentSide, FilterComponent } from "./components";

const VacationSchedulePage = () => {
  return (
    <Wrapper>
      <FilterComponent />
      <ContentSide />
    </Wrapper>
  );
};

export default VacationSchedulePage;
