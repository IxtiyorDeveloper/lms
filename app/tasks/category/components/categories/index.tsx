import React from "react";
import { Wrapper } from "./style";
import CategoryCard from "./categoryCard";
import { useTaskCategoryIndexAdmin, useTaskEnums } from "hooks";
import { Spin } from "antd";
import { useRouter } from "next/router";
import TaskUsersModal from "./taskUsersModal";
import DeleteTaskCategoryModal from "./deleteTaskModal";

const Categories = () => {
  const router = useRouter();

  const { data, isLoading } = useTaskCategoryIndexAdmin({
    query_params: {
      active: 1,
      year: router.query?.year,
      month: router.query?.month,
      status: null,
    },
  });

  const { data: taskEnums } = useTaskEnums();

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        {data?.map((item, index) => (
          <CategoryCard key={index} data={item} taskEnums={taskEnums} />
        ))}
        <TaskUsersModal />
        <DeleteTaskCategoryModal />
      </Wrapper>
    </Spin>
  );
};

export default Categories;
