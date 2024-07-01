import React, { FC } from "react";
import { Wrapper } from "./style";
import { CirclePlusSvg } from "@jasurbekyuldashov/lms-web-icons";

interface IProps {
  title: string;
  description: string;
  onClick?: any;
}
const EmptyContent: FC<IProps> = ({ title, description, onClick }) => {
  return (
    <Wrapper>
      <div onClick={() => onClick?.()}>
        <CirclePlusSvg width={32} height={32} />
      </div>
      <div className="title">{title}</div>
      <div className="mt-10 desc">{description}</div>
    </Wrapper>
  );
};

export default EmptyContent;
