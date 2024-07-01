import React, { FC } from "react";
import { CardFooter, IconWrapper, TextWrapper, UserWrapper } from "./style";
import { SupervisorSvg, UsernameSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { Badge } from "antd";
import { ITaskAdminCategory } from "types";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";

interface IProps {
  data?: ITaskAdminCategory;
}

const CardFooterComponent: FC<IProps> = (props) => {
  const { data } = props;
  const dispatch = useDispatch();

  const handleOpenModal = (user_type: number) => {
    dispatch(
      toggleModal({
        key: "taskUsers",
        data: {
          data: {
            user_type,
            category_id: data?.task_category.id,
          },
          open: true,
        },
      })
    );
  };

  return (
    <CardFooter>
      <UserWrapper onClick={() => handleOpenModal(200)}>
        <IconWrapper>
          <Badge
            count={data?.statistics?.count_responsible}
            className="badge"
          />
          <UsernameSvg color={bgColors.sadet} width={24} height={24} />
        </IconWrapper>
        <TextWrapper>Responsible</TextWrapper>
      </UserWrapper>
      <UserWrapper onClick={() => handleOpenModal(500)}>
        <IconWrapper>
          <Badge
            count={data?.statistics?.count_task_manager}
            className="badge"
          />
          <SupervisorSvg color={bgColors.sadet} width={24} height={24} />
        </IconWrapper>
        <TextWrapper>Supervisors</TextWrapper>
      </UserWrapper>
    </CardFooter>
  );
};

export default CardFooterComponent;
