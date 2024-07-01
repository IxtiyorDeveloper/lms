import React, { FC } from "react";
import { Type } from "./type";
import { StyledLink, StyledLinkWithOutLink } from "./style";

const NextLink: FC<Type> = ({ href, children, disabled, ...args }) => {
  const Link = disabled ? StyledLinkWithOutLink : StyledLink;
  return (
    <Link href={href || ""} className="next-link" {...args}>
      {children}
    </Link>
  );
};

export default NextLink;
