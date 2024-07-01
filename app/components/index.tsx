import React from "react";
import { Container, Wrapper } from "./style";
import Sidebar from "./sidebar";
import Content from "./content";

const Components = () => {
  return (
    <Wrapper>
      <Container>
        <Sidebar />
        <Content />
      </Container>
    </Wrapper>
  );
};

export default Components;
