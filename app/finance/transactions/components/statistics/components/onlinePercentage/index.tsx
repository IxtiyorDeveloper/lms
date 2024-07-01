import React from "react";
import { Wrapper } from "./style";
import { Popover, Spin, Tag } from "antd";
import Content from "./components/content";
import { bgColors } from "styles/theme";
import { useFinanceStatisticsOnlinePayment } from "hooks";

const OnlinePercentage = () => {
  const { data, isLoading, isPreviousData } =
    useFinanceStatisticsOnlinePayment();

  return (
    <Spin spinning={isLoading || isPreviousData}>
      <Wrapper>
        <Popover content={Content()} color={bgColors.dark}>
          <Tag>{data}%</Tag>
        </Popover>
      </Wrapper>
    </Spin>
  );
};

export default OnlinePercentage;
