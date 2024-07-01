import React, { CSSProperties } from "react";
import { Wrapper } from "./style";
import { CircleImage } from "../index";
import classNames from "classnames";

interface IProps {
  value?: any;
  canGetOriginalToThumb?: any;
  isBlack?: any;
  isRed?: any;
  abs?: any;
  color?: any;
  width?: number;
  height?: number;
  src?: string | { full_url: string | null };
  alt?: string;
  style?: CSSProperties;
  isPreview?: boolean;
}

const CircleImageBlackRedList = ({
  value,
  canGetOriginalToThumb,
  isBlack = false,
  isRed = false,
  abs,
  color,
  width = 40,
  height = 40,
  src,
  alt = "",
  style,
  isPreview,
}: IProps) => {
  const classes = classNames(
    {
      red: isRed,
      black: isBlack,
    },
    "image"
  );

  return (
    <Wrapper width={`${width}px`} height={`${height}px`}>
      {isRed && isBlack ? (
        <div className="avatar_wrap_container">
          <CircleImage
            height={width}
            width={height}
            src={src || value?.avatar || value?.userProfile?.avatar}
            alt={alt}
            canGetOriginalToThumb={canGetOriginalToThumb}
            abs={abs}
            color={color}
            style={style}
            isPreview={isPreview}
          />
          <div className={`avatar`}>
            <div className={`container`}></div>
          </div>
        </div>
      ) : (
        <CircleImage
          className={classes}
          height={height}
          width={width}
          src={src || value?.avatar || value?.userProfile?.avatar}
          alt={alt}
          canGetOriginalToThumb={canGetOriginalToThumb}
          abs={abs}
          color={color}
          style={style}
          isPreview={isPreview}
        />
      )}
    </Wrapper>
  );
};

export default CircleImageBlackRedList;
