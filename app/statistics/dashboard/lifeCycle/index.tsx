import React from "react";
import { Wrapper } from "./style";
import FilterComponent from "./components/filter";
import Content from "./components/content";
import { useLifeCyclePageData } from "hooks";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { LifeCycleModal } from "globals/components";

const LifeCycle = () => {
  const { data, isLoading, isPreviousData } = useLifeCyclePageData();
  const methods = useForm();
  return (
    <Wrapper>
      <LifeCycleModal />
      <Spin spinning={isLoading || isPreviousData}>
        <div className="filter">
          <FilterComponent data={data} methods={methods} />
        </div>
        <div className="content">
          <Content data={data} />
        </div>
      </Spin>
    </Wrapper>
  );
};

export default LifeCycle;
