import React from "react";
import { Wrapper } from "./style";
import Filter from "./components/filter";
import { Spin } from "antd";
import Group from "./components/group";

const GroupStatistics = () => {
  return (
    <Spin spinning={false}>
      <Wrapper>
        <Filter />
        <Group />
      </Wrapper>
    </Spin>
  );
};

export default GroupStatistics;
