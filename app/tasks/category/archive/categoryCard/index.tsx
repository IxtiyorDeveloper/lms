import React, { FC } from "react";
import { CardBody, CardWrapper } from "./style";
import { ITaskAdminCategory, ITaskEnums } from "types";
import Statistics from "./statistics";
import CardHeaderComponent from "./cardHeader";
import CardFooterComponent from "./cardFooter";

interface IProps {
  data?: ITaskAdminCategory;
  taskEnums?: ITaskEnums;
}

const CategoryCard: FC<IProps> = (props) => {
  const { data, taskEnums } = props;

  return (
    <CardWrapper>
      <CardHeaderComponent
        task_category={data?.task_category}
        statistics={data?.statistics}
      />
      <CardBody>
        <Statistics data={data?.statistics} taskEnums={taskEnums} />
      </CardBody>
      <CardFooterComponent data={data?.statistics} />
    </CardWrapper>
  );
};

export default CategoryCard;
