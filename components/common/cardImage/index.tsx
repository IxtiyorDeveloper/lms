import React from "react";
import { StyledImage, Wrapper } from "./style";
import { ImageProps } from "rc-image";

const CardImage = (props: ImageProps) => {
  const { src, ...args } = props;
  const image = !!src ? src : "/student/image.png";
  return (
    <Wrapper>
      <StyledImage
        className="image"
        height={150}
        width={100}
        src={image}
        {...args}
        alt="profile-img"
      />
    </Wrapper>
  );
};

export default CardImage;
