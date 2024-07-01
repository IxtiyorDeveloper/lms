import React from "react";
import { Spin, Timeline } from "antd";
import { Items } from "./items";
import { TimeLineWrapper, Wrapper } from "./style";
import { IStaffViewPageInfoData } from "types/staffSettings";
import { useGetLifecycleStaff } from "hooks";

const LifeCycle = ({
  dataGetOne,
}: {
  dataGetOne: IStaffViewPageInfoData | undefined;
}) => {
  const { data, isLoading } = useGetLifecycleStaff({
    query_params: {
      id: dataGetOne?.id,
    },
  });
  return (
    <Wrapper>
      <Spin spinning={isLoading}>
        <TimeLineWrapper>
          <Timeline
            items={Items({
              data,
            })}
          />
        </TimeLineWrapper>
      </Spin>
    </Wrapper>
  );
};

export default LifeCycle;
