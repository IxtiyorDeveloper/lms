import React from "react";
import { Wrapper } from "./style";
import { Spin } from "antd";
import NewStudent from "./components/newStudent";

const NewStudentsStatistics = () => {
  return (
    <Spin spinning={false}>
      <Wrapper>
        <NewStudent />
      </Wrapper>
    </Spin>
  );
};

export default NewStudentsStatistics;
