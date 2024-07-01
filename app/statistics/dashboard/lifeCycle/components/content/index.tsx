import React from "react";
import { Wrapper } from "./style";
import TopFilters from "../topFilters";
import LifeCycleTable from "../table";
import { ILifeCyclePageData } from "types/lifeCycle";
import LifeCycleMenu from "../menu";
import { Affix } from "antd";

const Content = ({ data }: { data: ILifeCyclePageData | undefined }) => {
  return (
    <Wrapper>
      <div className="sider">
        <Affix offsetTop={90}>
          <LifeCycleMenu />
        </Affix>
      </div>

      <div className="content">
        <TopFilters data={data} />
        <div className="steps">
          <LifeCycleTable pageData={data} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Content;
