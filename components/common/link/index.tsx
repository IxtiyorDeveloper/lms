import React, { FC } from "react";
import { Type } from "./type";
import { StyledLink, StyledLinkWithOutLink } from "./style";
import { LinkProps } from "next/link";

const MyLink: FC<Type & LinkProps> = ({
  href,
  children,
  disabled,
  ...args
}) => {
  const Link = disabled ? StyledLinkWithOutLink : StyledLink;
  return (
    <Link href={href} className="name" {...(args as any)}>
      {children}
    </Link>
  );
};

export default MyLink;
