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
import { EditSvg, RestoreSvg } from "@jasurbekyuldashov/lms-web-icons";
import { ITaskAdminTaskCategory, ITaskAdminTaskStatistics } from "types";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";

interface IProps {
  task_category?: ITaskAdminTaskCategory;
  statistics?: ITaskAdminTaskStatistics;
}

const CardHeaderComponent: FC<IProps> = (props) => {
  const { task_category, statistics } = props;
  const dispatch = useDispatch();

  const handleOpenModal = (id?: number) => {
    dispatch(
      toggleModal({
        key: "confirmRestoreTaskCategory",
        data: {
          data: { id },
          open: true,
        },
      })
    );
  };

  return (
    <CardHeader>
      <DepartmentWrapper>
        <IconWrapper>
          <Icon
            src={
              task_category?.iconUrl !== "/"
                ? task_category?.iconUrl
                : "/noimage.png"
            }
            alt={task_category?.name}
          />
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
        <Action>
          <EditSvg />
        </Action>
        <Action onClick={() => handleOpenModal(task_category?.id)}>
          <RestoreSvg />
        </Action>
      </ActionWrapper>
    </CardHeader>
  );
};

export default CardHeaderComponent;
