import React, { FC } from "react";
import { CardFooter, IconWrapper, TextWrapper, UserWrapper } from "./style";
import { UsernameSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { Badge } from "antd";
import { ITaskAdminTaskStatistics } from "types";

interface IProps {
  data?: ITaskAdminTaskStatistics;
}

const CardFooterComponent: FC<IProps> = (props) => {
  const { data } = props;

  return (
    <CardFooter>
      <UserWrapper>
        <IconWrapper>
          <Badge count={data?.count_responsible} className="badge" />
          <UsernameSvg color={bgColors.sadet} width={24} height={24} />
        </IconWrapper>
        <TextWrapper>Responsible</TextWrapper>
      </UserWrapper>
      <UserWrapper>
        <IconWrapper>
          <Badge count={data?.count_task_manager} className="badge" />
          <UsernameSvg color={bgColors.sadet} width={24} height={24} />
        </IconWrapper>
        <TextWrapper>Supervisors</TextWrapper>
      </UserWrapper>
    </CardFooter>
  );
};

export default CardFooterComponent;
