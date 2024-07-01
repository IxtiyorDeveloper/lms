import React, { FC } from "react";
import { Container, Header, Left, Right, Wrapper } from "./style";
import { IDefinition } from "./type";
import TopCard from "./components/topCard";
import DetailedCard from "./components/detailedCards";
import Tabs from "./components/tabs";
import { RoleKeys } from "constants/department";
import { useDetailedSalaryGroup } from "hooks";
import { expand } from "./components/tabs/expand";
import { Spin } from "antd";
import { bgColors } from "styles/theme";
import { CallXIcon } from "@jasurbekyuldashov/lms-web-icons";

const Definition: FC<IDefinition> = ({ record, data, handleOpenChange }) => {
  const isTeacher = data?.role?.key == RoleKeys.TEACHER;

  const {
    data: detailedData,
    isInitialLoading,
    isLoading,
  } = useDetailedSalaryGroup({
    query_params: {
      id: record?.id,
      expand,
    },
  });

  return (
    <Wrapper>
      <Header>
        <Left>Salary info</Left>
        <Right onClick={() => handleOpenChange(false)}>
          <CallXIcon color={bgColors.whiteSmoke} />
        </Right>
      </Header>
      <Container>
        <Spin spinning={isLoading || isInitialLoading}>
          <TopCard record={record} data={data} isTeacher={isTeacher} />
          <DetailedCard
            record={record}
            data={data}
            detailedData={detailedData}
          />
          {isTeacher && (
            <div className="tab-container">
              <Tabs record={record} data={data} detailedData={detailedData} />
            </div>
          )}
        </Spin>
      </Container>
    </Wrapper>
  );
};

export default Definition;
