import React from "react";
import { Wrapper } from "./style";
import Filter from "./components/filter";
import { Spin } from "antd";
import Student from "./components/student";

const FreshmanLost = () => {
  return (
    <Spin spinning={false}>
      <Wrapper>
        <Filter />
        <Student />
      </Wrapper>
    </Spin>
  );
};

export default FreshmanLost;
