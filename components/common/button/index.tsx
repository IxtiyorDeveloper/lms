import { CSSProperties, ReactNode } from "react";
import { ImageWrapper, Wrapper, TextWrapper } from "./style";
import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import Image from "next/image";
import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

interface Interface {
  disabled?: boolean;
  buttonType?: "regular" | "green";
  btnType?: "primary" | "success" | "default" | "danger";
  type?: "button" | "submit" | "reset";
  text?: string | ReactNode;
  iconUrl?: string;
  style?: CSSProperties | undefined;
  bgColor?: string;
  textColor?: string;
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  textStyle?: CSSProperties | undefined;
  icon?: ReactNode;
  className?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
  args?: any;
  buttonLoading?: boolean;
  wrapperStyle?: CSSProperties | undefined;
  isHovered?: boolean;
  href?: string;
}

const StyledButton = ({
  disabled,
  buttonType,
  type,
  text,
  iconUrl,
  style,
  bgColor,
  textColor,
  children,
  onClick,
  textStyle,
  icon,
  className,
  onMouseEnter,
  onMouseLeave,
  args,
  buttonLoading,
  wrapperStyle,
  isHovered = true,
  btnType,
  href,
}: Interface) => {
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => {
    const type = () =>
      ({
        primary: bgColors?.primary,
        success: bgColors?.secondary,
        default: bgColors.wildSand,
        danger: bgColors?.pop,
      })[btnType ?? "primary"];

    return {
      color: textColor ?? textColors?.dark,
      backgroundColor: bgColor ?? bgColors?.primary,
      "&:hover": isHovered
        ? {
            backgroundColor: bgColor ?? bgColors?.primary,
            boxShadow: "0 1px 1px rgba(0, 0, 0, 0.05)",
            borderRadius: "8px",
          }
        : {},
      boxShadow:
        buttonLoading || disabled
          ? "none!important"
          : "0 1px 1px rgba(0, 0, 0, 0.05)",
      borderRadius: "8px",
      fontSize: fontSizes.f12,
      paddingTop: "10px",
      paddingBottom: "10px",
      lineHeight: "20px",
      display: "flex",
      gap: 4,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      minHeight: "37px",
      fontWeight: 700,
    };
  });
  return (
    <Wrapper
      style={{
        ...wrapperStyle,
        width: style?.width ?? "fit-content",
      }}
    >
      <ColorButton
        variant="contained"
        disabled={disabled || buttonLoading}
        type={type}
        style={{ textTransform: "none", ...style }}
        onClick={onClick}
        className={className}
        {...args}
        onMouseMove={onMouseEnter}
        onMouseLeave={onMouseLeave}
        disableElevation
        href={href}
      >
        {icon}
        {!!iconUrl && (
          <ImageWrapper>
            <Image src={iconUrl} alt={iconUrl} width={18} height={18} />
          </ImageWrapper>
        )}
        {buttonLoading && (
          <CircularProgress
            color="inherit"
            size={16}
            style={{ marginRight: "10px" }}
          />
        )}
        {!!text && <TextWrapper style={textStyle}>{text}</TextWrapper>}
        {children}
      </ColorButton>
    </Wrapper>
  );
};
// @ts-ignore
export default StyledButton;
// @ts-ignore
