import React, { FC } from "react";
import moment from "moment";
import { CalendarSvg } from "@jasurbekyuldashov/lms-web-icons";
import { Wrapper, ListWrapper } from "./style";
import { bgColors } from "styles/theme";

interface IProps {
  branch?: string;
  department?: string;
  date: string | number;
}

const Credentials: FC<IProps> = (props) => {
  return (
    <Wrapper>
      <ListWrapper>{props.branch || "No/All branch"}</ListWrapper>
      <ListWrapper>{props.department || "No/All department"}</ListWrapper>
      <ListWrapper>
        <CalendarSvg color={bgColors.yourLighter} />
        <span>{moment(props.date).format("DD MMM, HH:mm")}</span>
      </ListWrapper>
    </Wrapper>
  );
};

export default Credentials;
