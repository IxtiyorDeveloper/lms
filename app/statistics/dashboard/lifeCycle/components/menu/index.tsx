import React from "react";
import { Collapse, Spin } from "antd";
import {
  CollapseWrapper,
  DepartmentsWrapper,
  ParentHeader,
  StyledParentCollapse,
  Wrapper,
} from "./style";
import ChildMenu from "./childMenu";
import { useDepartmentList } from "hooks";
import { InputWithIcon, SearchSvg } from "components";
import { useForm } from "react-hook-form";
import { StaffStatus } from "../../../../../../types/finance/salary";

const { Panel } = Collapse;

const LifeCycleMenu: React.FC = () => {
  const { control } = useForm();
  const { data, isLoading, isPreviousData } = useDepartmentList({
    query_params: {
      status: StaffStatus.WORKING,
      expand: "rbacAssignmentCount",
      excludeStudent: 1,
    },
  });

  return (
    <Wrapper>
      <Spin spinning={isLoading || isPreviousData}>
        <DepartmentsWrapper>
          <div className="header">
            <p className="title-department">Departments</p>
          </div>
          <div className="body">
            <div className="search">
              <InputWithIcon
                icon={SearchSvg}
                name="search"
                control={control}
                placeholder="Search"
              />
            </div>
            <CollapseWrapper>
              <StyledParentCollapse>
                {data?.list?.map((item) => {
                  return (
                    <Panel
                      header={
                        <ParentHeader className="active">
                          <div>{item?.name}</div>
                          <div>{item?.rbacAssignmentCount}</div>
                        </ParentHeader>
                      }
                      key={item.id}
                    >
                      <ChildMenu item={item} />
                    </Panel>
                  );
                })}
              </StyledParentCollapse>
            </CollapseWrapper>
          </div>
        </DepartmentsWrapper>
      </Spin>
    </Wrapper>
  );
};

export default LifeCycleMenu;
