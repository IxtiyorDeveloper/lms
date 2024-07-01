import React, { FC } from "react";
import {
  Action,
  ActionWrapper,
  CardHeader,
  DepartmentWrapper,
  Icon,
  IconWrapper,
  RateWrapper,
  RatingSide,
} from "./style";
import { Rate } from "antd";
import { DeleteSvg, EditSvg } from "@jasurbekyuldashov/lms-web-icons";
import { ITaskAdminTaskCategory, ITaskAdminTaskStatistics } from "types";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";

interface IProps {
  task_category?: ITaskAdminTaskCategory;
  statistics?: ITaskAdminTaskStatistics;
}

const CardHeaderComponent: FC<IProps> = (props) => {
  const { task_category, statistics } = props;

  const dispatch = useDispatch();

  const handleOpen = (id?: number) => {
    dispatch(
      toggleModal({
        key: "removeCategory",
        data: {
          data: {
            id,
          },
          open: true,
        },
      })
    );
  };

  const handleUpdateOpen = (id?: number) => {
    dispatch(
      toggleModal({
        key: "createTaskCategory",
        data: {
          data: {
            action: "update",
            id,
          },
          open: true,
        },
      })
    );
  };

  return (
    <CardHeader>
      <DepartmentWrapper>
        <IconWrapper>
          <Icon src={task_category?.iconUrl} alt={task_category?.name} />
        </IconWrapper>
        <RatingSide>
          <p className="name">{task_category?.name}</p>
          <RateWrapper>
            <Rate disabled defaultValue={Number(statistics?.avg_point) || 0} />{" "}
            <ins>{Number(statistics?.avg_point).toFixed(1)}</ins>
          </RateWrapper>
        </RatingSide>
      </DepartmentWrapper>
      <ActionWrapper>
        <Action onClick={() => handleUpdateOpen(task_category?.id)}>
          <EditSvg />
        </Action>
        <Action onClick={() => handleOpen(task_category?.id)}>
          <DeleteSvg />
        </Action>
      </ActionWrapper>
    </CardHeader>
  );
};

export default CardHeaderComponent;
