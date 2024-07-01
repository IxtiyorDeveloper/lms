import React from "react";
import { Circle, Wrapper } from "./style";
import { ImageProps } from "rc-image";
import { Badge } from "antd";
import LazyImage from "./lazy";
import { BadgeStarSvg } from "../../index";

export interface Interface extends Omit<ImageProps, "preview" | "src"> {
  count?: number;
  height?: number | string;
  width?: number | string;
  color?: string;
  abs?: React.ReactNode;
  src?: SrcInterface | string;
  index?: string | number;
  canGetOriginalToThumb?: boolean;
  originalAlways?: boolean;
  showNew?: boolean;
  border?: string;
  isPreview?: boolean;
}

export interface SrcInterface {
  full_url?: string | null;
  children?: { full_url?: string; resolution?: string }[];
}

const CircleImage = (props: Interface) => {
  const { canGetOriginalToThumb = true, ...rest } = props;
  return (
    <Wrapper border={props.border}>
      {!!props?.count ? (
        <Badge count={props?.count} color={props?.color}>
          <LazyImage
            loading="lazy"
            {...rest}
            canGetOriginalToThumb={canGetOriginalToThumb}
          />
        </Badge>
      ) : (
        <Circle color={props.color} border={props.border}>
          {props?.abs}
          {props?.showNew && (
            <div className="absn">
              <BadgeStarSvg />
              <p className="num_new">New</p>
            </div>
          )}
          <LazyImage
            loading="lazy"
            {...rest}
            canGetOriginalToThumb={canGetOriginalToThumb}
          />
        </Circle>
      )}
    </Wrapper>
  );
};

export default CircleImage;
