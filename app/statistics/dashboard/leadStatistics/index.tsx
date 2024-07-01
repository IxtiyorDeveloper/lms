import React from "react";
import { Wrapper } from "./style";
import Filter from "./components/filter";
import { Spin } from "antd";
import Lead from "./components/lead";

const LeadStatistics = () => {
  return (
    <Spin spinning={false}>
      <Wrapper>
        <Filter />
        <Lead />
      </Wrapper>
    </Spin>
  );
};

export default LeadStatistics;
