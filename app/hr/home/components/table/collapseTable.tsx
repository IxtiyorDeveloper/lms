import React, { useMemo } from "react";
import { filterCandidate } from "./utils";
import { CollapseWrapper, EmptyWrapper, Name, PanelHeader } from "./style";
import { Empty, Flex } from "antd";
import { Table } from "./components";
import { CircleImage } from "components";
import { IHRMainGeneral, InitialDataHR } from "types";
import { Collapse } from "components";
import AntdBadge from "components/common/antdBadge";
import { bgColors } from "styles/theme";
import { useSelector } from "react-redux";
import { IStore } from "store";

const CollapseTable = ({
  data,
  isLoading,
  initialData,
}: {
  data: IHRMainGeneral | undefined;
  initialData: InitialDataHR | undefined;
  isLoading: boolean | undefined;
}) => {
  const { user } = useSelector((state: IStore) => state?.user);
  const filter = filterCandidate(data?.data?.list);

  const panelGroup = useMemo(() => {
    return filter?.map((item, index) => {
      return {
        key: `${item.responsible?.id}`,
        label: (
          <PanelHeader>
            {item.responsible ? (
              <Flex gap={10} align="center">
                <CircleImage src={item?.responsible?.avatar} alt="" />
                <Name>
                  <Flex gap={14} align="center">
                    {item?.responsible?.fullName}
                    <AntdBadge
                      content={item?.data?.length}
                      color={bgColors.midori}
                    />
                  </Flex>
                </Name>
              </Flex>
            ) : (
              <Name
                style={{
                  marginLeft: 50,
                }}>
                <Flex gap={14} align="center">
                  Meeting not set
                  <AntdBadge content={item?.data?.length} />
                </Flex>
              </Name>
            )}
          </PanelHeader>
        ),
        children: (
          <Table
            data={data}
            list={item?.data}
            isCollapse
            isLoading={isLoading}
            initialData={initialData}
          />
        ),
      };
    });
  }, [data, isLoading]);
  return (
    <CollapseWrapper>
      {filter.length ? (
        <Collapse
          bordered={false}
          items={panelGroup}
          accordion={false}
          defaultActiveKey={[
            filter?.find(
              (item) =>
                item.responsible?.base_user_id == user?.userProfile?.user_id
            )?.responsible?.id || "",
          ]}
        />
      ) : (
        <EmptyWrapper>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </EmptyWrapper>
      )}
    </CollapseWrapper>
  );
};

export default CollapseTable;
