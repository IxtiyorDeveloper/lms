import { FC } from "react";
import { ImageWrapper, Wrapper, TextWrapper, StyledButton } from "./style";
import Image from "next/image";
import React from "react";
import { IButtonProps } from "./type";

const AntButton: FC<IButtonProps> = ({
  style,
  disabled,
  type,
  className,
  onMouseEnter,
  onMouseLeave,
  onClick,
  icon,
  iconUrl,
  text,
  children,
  textStyle,
  args,
  isClickAnimation = true,
  buttonLoading,
  wrapperStyle,
}) => {
  return (
    <Wrapper style={{ ...wrapperStyle, width: style?.width ?? "fit-content" }}>
      <StyledButton
        variant="contained"
        disabled={disabled}
        type={type}
        style={{ textTransform: "none", ...style }}
        onClick={onClick}
        className={className}
        onMouseMove={onMouseEnter}
        onMouseLeave={onMouseLeave}
        loading={buttonLoading}
        isClickAnimation={isClickAnimation}
        {...args}
      >
        {icon}
        {!!iconUrl && (
          <ImageWrapper>
            <Image src={iconUrl} alt={iconUrl} width={18} height={18} />
          </ImageWrapper>
        )}
        {!!text && <TextWrapper style={textStyle}>{text}</TextWrapper>}
        {children}
      </StyledButton>
    </Wrapper>
  );
};
export default AntButton;
