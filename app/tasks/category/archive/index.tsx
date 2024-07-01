import React from "react";
import { EmptyWrapper, Wrapper } from "./style";
import { useTaskCategoryIndexAdminArchive, useTaskEnums } from "hooks";
import { Empty, Spin } from "antd";
import CategoryCard from "./categoryCard";
import ConfirmRestoreModal from "./restoreModal";

const ArchiveCategory = () => {
  const { data: taskEnums } = useTaskEnums();

  const { data, isLoading } = useTaskCategoryIndexAdminArchive({
    query_params: {
      active: 0,
      status: null,
    },
  });

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        {data?.length === 0 ? (
          <EmptyWrapper>
            <Empty />
          </EmptyWrapper>
        ) : (
          data?.map((item, index) => (
            <CategoryCard key={index} data={item} taskEnums={taskEnums} />
          ))
        )}
        <ConfirmRestoreModal />
      </Wrapper>
    </Spin>
  );
};

export default ArchiveCategory;
