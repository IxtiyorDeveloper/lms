import React from "react";
import { Amount, Content, Header, Wrapper } from "./style";
import { Rate } from "antd";

const Rating = ({ value }: { value: number }) => {
  return (
    <Wrapper>
      <Header>Average Rating</Header>
      <Content>
        <Amount>{value}</Amount>
        <Rate value={value} disabled />
      </Content>
    </Wrapper>
  );
};

export default Rating;
