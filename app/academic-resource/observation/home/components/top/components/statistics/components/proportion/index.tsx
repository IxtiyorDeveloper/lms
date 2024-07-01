import React from "react";
import {
  Content,
  Count,
  Header,
  Name,
  Percentage,
  Row,
  Wrapper,
  Text,
  Dot,
} from "./style";
import { Type } from "./type";

const Proportion = ({ data }: Type) => {
  return (
    <Wrapper>
      <Header>Observation Proportion</Header>
      <Content>
        {data?.map((item, index) => {
          return (
            <Row key={index}>
              <Name>
                <Dot className="observed" />
                <Text>{item.text}</Text>
              </Name>
              <Count>{item.value}</Count>
              <Percentage>{item.percentage}%</Percentage>
            </Row>
          );
        })}
      </Content>
    </Wrapper>
  );
};

export default Proportion;
