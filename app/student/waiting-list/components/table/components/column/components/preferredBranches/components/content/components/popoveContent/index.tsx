import React from "react";
import { Wrapper, Row } from "./style";
import { IGroup, IPreferredBranch } from "types";

const Content = ({ branches }: { branches: IPreferredBranch[] }) => {
  return (
    <Wrapper>
      {branches?.map((item, index) => {
        return <Row key={index}>{item?.branch?.name}</Row>;
      })}
    </Wrapper>
  );
};

export default Content;
