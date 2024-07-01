import React, { FC } from "react";
import { ArrowRedirectSvg } from "components";
import { ImageSite, LinkButton } from "./style";

interface IImageSite {
  image?: string;
}

const ImageSiteComponent: FC<IImageSite> = ({ image }) => {
  return (
    <ImageSite>
      <LinkButton href="https://inter-nation.uz">
        <span>inter-nation.uz</span>
        <ArrowRedirectSvg />
      </LinkButton>
      <img src={image || "/lms.webp"} alt="main" />
    </ImageSite>
  );
};

export default ImageSiteComponent;
