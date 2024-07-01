import React, { FC } from "react";
import { IconWrapper, TextWrapper, Wrapper } from "./style";

interface IBadge {
  children: React.ReactNode;
  text: string | number;
  width?: number;
  style?: React.CSSProperties;
}

const Badge: FC<IBadge> = ({ style, children, text, width = 14 }) => {
  return (
    <Wrapper>
      <IconWrapper>{children}</IconWrapper>
      <TextWrapper style={style} w={width}>{text}</TextWrapper>
    </Wrapper>
  );
};

export default Badge;
