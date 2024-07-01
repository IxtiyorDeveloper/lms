import React from "react";
import { Wrapper } from "./style";
import { Categories, Filter } from "./components";

const Category = () => {
  return (
    <Wrapper>
      <Filter />
      <Categories />
    </Wrapper>
  );
};

export default Category;
